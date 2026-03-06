# YANORA 数据库快速设置指南

本文档提供完整的数据库结构说明和数据接口，方便在新的 Supabase 账号中快速重建系统。

---

## 📋 目录

1. [核心数据表结构](#核心数据表结构)
2. [管理员设置](#管理员设置)
3. [数据接口 API](#数据接口-api)
4. [快速设置步骤](#快速设置步骤)
5. [示例数据](#示例数据)

---

## 核心数据表结构

### 1. **profiles** - 用户资料表
存储用户基本信息

```sql
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text UNIQUE NOT NULL,
  full_name text,
  phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

**字段说明：**
- `id`: 用户唯一ID（关联 auth.users）
- `email`: 用户邮箱
- `full_name`: 姓名（可选）
- `phone`: 电话号码（可选）

---

### 2. **admins** - 管理员表
管理后台管理员账号

```sql
CREATE TABLE admins (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text UNIQUE NOT NULL,
  username text UNIQUE NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);
```

**字段说明：**
- `id`: 管理员ID（关联 auth.users）
- `email`: 管理员邮箱
- `username`: 管理员用户名
- `is_active`: 是否激活状态

**辅助函数：**
```sql
CREATE OR REPLACE FUNCTION is_admin(user_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admins
    WHERE id = user_id AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

### 3. **bookings** - 预约表
存储用户预约信息

```sql
CREATE TABLE bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  service_type text NOT NULL,
  preferred_date date NOT NULL,
  preferred_time text NOT NULL,
  message text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  payment_method text CHECK (payment_method IN ('PayPal', '银行卡', '微信支付', '支付宝')),
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  total_amount numeric(10,2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

**字段说明：**
- `user_id`: 用户ID（可为空，支持访客预约）
- `name`, `email`, `phone`: 客户联系信息
- `service_type`: 服务类型
- `preferred_date`: 期望预约日期
- `preferred_time`: 期望预约时间
- `status`: 预约状态（pending/confirmed/cancelled/completed）
- `payment_status`: 支付状态
- `total_amount`: 总金额

---

### 4. **booking_services** - 预约服务明细表
存储每个预约包含的具体服务

```sql
CREATE TABLE booking_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  service_name text NOT NULL,
  service_price numeric(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);
```

---

### 5. **case_studies** - 简单案例表
展示前后对比图（首页使用）

```sql
CREATE TABLE case_studies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  before_image_url text NOT NULL,
  after_image_url text NOT NULL,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
```

**字段说明：**
- `before_image_url`: 治疗前图片URL
- `after_image_url`: 治疗后图片URL
- `display_order`: 显示顺序

---

### 6. **detailed_cases** - 详细案例表
详细案例页面数据，支持多语言和多分类

```sql
CREATE TABLE detailed_cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  title_en text NOT NULL,
  description text NOT NULL,
  description_en text NOT NULL,
  before_image_url text NOT NULL,
  after_image_url text NOT NULL,
  category text NOT NULL,
  show_in_facial boolean DEFAULT false,
  show_in_dental boolean DEFAULT false,
  show_in_injection boolean DEFAULT false,
  show_in_body boolean DEFAULT false,
  show_in_hair boolean DEFAULT false,
  display_order integer DEFAULT 0,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

**字段说明：**
- `title` / `title_en`: 中英文标题
- `description` / `description_en`: 中英文描述
- `category`: 案例分类
- `show_in_*`: 是否在各个服务页面显示
  - `show_in_facial`: 面部轮廓页面
  - `show_in_dental`: 牙齿美容页面
  - `show_in_injection`: 注射提升页面
  - `show_in_body`: 身体塑形页面
  - `show_in_hair`: 植发页面
- `is_published`: 是否发布

---

### 7. **testimonials** - 客户评价表
存储客户评价和反馈

```sql
CREATE TABLE testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image1_url text DEFAULT '',
  image2_url text DEFAULT '',
  image3_url text DEFAULT '',
  message text NOT NULL,
  customer_name text NOT NULL,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

**字段说明：**
- `image1_url`, `image2_url`, `image3_url`: 三张图片URL
- `message`: 评价内容
- `customer_name`: 客户姓名
- `is_active`: 是否激活显示

---

### 8. **faqs** - 常见问题表
FAQ 问答系统

```sql
CREATE TABLE faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  question text NOT NULL,
  answer text NOT NULL,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

**字段说明：**
- `category`: 问题分类
- `question`: 问题
- `answer`: 答案
- `is_active`: 是否显示

---

### 9. **payments** - 支付记录表
记录所有支付交易

```sql
CREATE TABLE payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  amount numeric(10,2) NOT NULL,
  payment_method text NOT NULL,
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  transaction_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

---

### 10. **Storage Buckets** - 存储桶
用于存储图片文件

需要创建的存储桶：
- **case-images**: 案例图片
  - 公共读取
  - 管理员可上传

---

## 管理员设置

### 创建第一个管理员账号

**步骤：**

1. **在 Supabase Dashboard 注册一个用户**
   - 进入 Authentication > Users
   - 点击 "Add User"
   - 输入邮箱和密码
   - 复制生成的 User ID

2. **将该用户添加到 admins 表**

```sql
-- 替换 'your-user-id' 和 'your-email@example.com'
INSERT INTO admins (id, email, username, is_active)
VALUES (
  'your-user-id',
  'your-email@example.com',
  'admin',
  true
);
```

3. **验证管理员权限**

```sql
-- 检查管理员是否创建成功
SELECT * FROM admins WHERE email = 'your-email@example.com';
```

---

## 数据接口 API

### 1. 预约管理 (Bookings)

#### 创建预约
```typescript
// 任何人都可以创建预约（包括访客）
const { data, error } = await supabase
  .from('bookings')
  .insert({
    name: '张三',
    email: 'zhangsan@example.com',
    phone: '+86 138 0000 0000',
    service_type: '面部轮廓',
    preferred_date: '2026-03-15',
    preferred_time: '上午 10:00-12:00',
    message: '想咨询鼻部整形',
    total_amount: 100.00,
    payment_method: '微信支付'
  })
  .select()
  .single();
```

#### 查询用户自己的预约
```typescript
const { data, error } = await supabase
  .from('bookings')
  .select('*, booking_services(*)')
  .order('created_at', { ascending: false });
```

#### 管理员查询所有预约
```typescript
const { data, error } = await supabase
  .from('bookings')
  .select('*, booking_services(*)')
  .order('created_at', { ascending: false });
```

#### 更新预约状态
```typescript
const { data, error } = await supabase
  .from('bookings')
  .update({
    status: 'confirmed',
    payment_status: 'paid'
  })
  .eq('id', bookingId);
```

---

### 2. 案例管理 (Cases)

#### 添加简单案例（首页展示）
```typescript
const { data, error } = await supabase
  .from('case_studies')
  .insert({
    before_image_url: '/images/before1.jpg',
    after_image_url: '/images/after1.jpg',
    display_order: 1
  });
```

#### 添加详细案例
```typescript
const { data, error } = await supabase
  .from('detailed_cases')
  .insert({
    title: '鼻部综合整形案例',
    title_en: 'Comprehensive Rhinoplasty Case',
    description: '详细描述...',
    description_en: 'Detailed description...',
    before_image_url: '/images/before.jpg',
    after_image_url: '/images/after.jpg',
    category: '面部轮廓',
    show_in_facial: true,
    display_order: 1,
    is_published: true
  });
```

#### 查询发布的详细案例
```typescript
// 查询所有已发布案例
const { data, error } = await supabase
  .from('detailed_cases')
  .select('*')
  .eq('is_published', true)
  .order('display_order', { ascending: true });

// 查询特定页面的案例（例如：面部轮廓页面）
const { data, error } = await supabase
  .from('detailed_cases')
  .select('*')
  .eq('show_in_facial', true)
  .eq('is_published', true)
  .order('display_order', { ascending: true });
```

---

### 3. 客户评价 (Testimonials)

#### 添加评价
```typescript
const { data, error } = await supabase
  .from('testimonials')
  .insert({
    image1_url: '/images/testimonial1.jpg',
    image2_url: '/images/testimonial2.jpg',
    image3_url: '/images/testimonial3.jpg',
    message: '非常满意的整形体验...',
    customer_name: 'Lisa',
    display_order: 1,
    is_active: true
  });
```

#### 查询激活的评价
```typescript
const { data, error } = await supabase
  .from('testimonials')
  .select('*')
  .eq('is_active', true)
  .order('display_order', { ascending: true });
```

---

### 4. FAQ 管理

#### 添加 FAQ
```typescript
const { data, error } = await supabase
  .from('faqs')
  .insert({
    category: '整形手术',
    question: '整形手术需要多长时间？',
    answer: '根据不同的手术类型，时间从30分钟到4小时不等...',
    display_order: 1,
    is_active: true
  });
```

#### 查询激活的 FAQ
```typescript
const { data, error } = await supabase
  .from('faqs')
  .select('*')
  .eq('is_active', true)
  .order('display_order', { ascending: true });
```

#### 按分类查询
```typescript
const { data, error } = await supabase
  .from('faqs')
  .select('*')
  .eq('category', '整形手术')
  .eq('is_active', true)
  .order('display_order', { ascending: true });
```

---

### 5. 图片上传 (Storage)

#### 上传案例图片
```typescript
// 上传到 case-images 存储桶
const file = event.target.files[0];
const fileName = `${Date.now()}_${file.name}`;

const { data, error } = await supabase.storage
  .from('case-images')
  .upload(fileName, file);

if (data) {
  // 获取公共URL
  const { data: { publicUrl } } = supabase.storage
    .from('case-images')
    .getPublicUrl(fileName);

  console.log('图片URL:', publicUrl);
}
```

---

## 快速设置步骤

### 第一步：运行所有迁移

1. 进入 Supabase Dashboard
2. 打开 SQL Editor
3. 按顺序执行 `supabase/migrations/` 文件夹中的所有 SQL 文件

关键迁移文件顺序：
1. `create_admin_system.sql` - 创建管理员系统
2. `create_bookings_system.sql` - 创建预约系统
3. `create_case_studies_table.sql` - 创建案例表
4. `create_payments_table.sql` - 创建支付表
5. `create_faq_table.sql` - 创建FAQ表
6. `create_testimonials_table.sql` - 创建评价表
7. `simplify_case_studies_and_create_detailed_cases.sql` - 创建详细案例表
8. `create_profile_trigger.sql` - 创建自动创建用户资料触发器

### 第二步：创建存储桶

1. 进入 Storage
2. 创建新的存储桶 `case-images`
3. 设置为 Public bucket
4. 添加策略允许管理员上传

```sql
-- 允许管理员上传
CREATE POLICY "Admins can upload case images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'case-images'
  AND is_admin(auth.uid())
);

-- 允许所有人读取
CREATE POLICY "Anyone can view case images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'case-images');
```

### 第三步：创建第一个管理员

运行前面提到的管理员创建 SQL

### 第四步：测试数据访问

```typescript
// 测试公共访问
const { data } = await supabase.from('case_studies').select('*');

// 测试管理员访问
const { data: bookings } = await supabase.from('bookings').select('*');
```

---

## 示例数据

### FAQ 示例数据

```sql
INSERT INTO faqs (category, question, answer, display_order, is_active) VALUES
('整形手术', '整形手术是否安全？', '我们的整形手术由经验丰富的专业医生执行，采用先进的医疗设备和技术，确保手术的安全性和效果。', 1, true),
('整形手术', '整形手术需要多长时间？', '手术时间根据项目不同而异，一般从30分钟到4小时不等。具体时间会在术前咨询时告知。', 2, true),
('预约咨询', '如何预约咨询？', '您可以通过我们的网站在线预约系统、电话或电子邮件预约咨询。我们会尽快回复您的预约请求。', 1, true),
('预约咨询', '咨询费用是多少？', '首次咨询费用为100欧元，此费用可抵扣后续手术费用。', 2, true);
```

### 案例示例数据

```sql
-- 简单案例
INSERT INTO case_studies (before_image_url, after_image_url, display_order) VALUES
('/public/before1.jpg', '/public/after1.jpg', 1),
('/public/before2.jpg', '/public/after2.jpg', 2),
('/public/before3.jpg', '/public/after3.jpg', 3);

-- 详细案例
INSERT INTO detailed_cases (
  title, title_en,
  description, description_en,
  before_image_url, after_image_url,
  category, show_in_facial, display_order, is_published
) VALUES (
  '鼻部综合整形',
  'Comprehensive Rhinoplasty',
  '客户希望改善鼻梁高度和鼻尖形状。通过综合鼻部整形手术，成功塑造了自然立体的鼻型。',
  'The client wanted to improve the nose bridge height and tip shape. Through comprehensive rhinoplasty, we successfully created a natural and defined nose.',
  '/images/nose_before.jpg',
  '/images/nose_after.jpg',
  '面部轮廓',
  true,
  1,
  true
);
```

### 评价示例数据

```sql
INSERT INTO testimonials (
  image1_url, image2_url, image3_url,
  message, customer_name, display_order, is_active
) VALUES (
  '/testimonials/lisa1.jpg',
  '/testimonials/lisa2.jpg',
  '/testimonials/lisa3.jpg',
  '非常专业的团队，手术效果超出预期！整个过程很顺利，恢复也很快。强烈推荐！',
  'Lisa',
  1,
  true
);
```

---

## 环境变量配置

在新项目的 `.env` 文件中配置：

```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

---

## 权限总结

### 公共访问（无需登录）
- ✅ 查看已发布的案例
- ✅ 查看激活的评价
- ✅ 查看激活的FAQ
- ✅ 创建预约
- ✅ 查看案例图片

### 普通用户（已登录）
- ✅ 查看和更新自己的预约
- ✅ 查看自己的资料
- ✅ 所有公共访问权限

### 管理员
- ✅ 所有用户权限
- ✅ 查看和管理所有预约
- ✅ 创建/编辑/删除案例
- ✅ 创建/编辑/删除评价
- ✅ 创建/编辑/删除FAQ
- ✅ 上传图片到存储桶
- ✅ 查看所有用户资料

---

## 常见问题

### Q: 如何批量导入数据？
A: 使用 Supabase SQL Editor 执行批量 INSERT 语句，或使用 JavaScript 脚本通过 API 批量插入。

### Q: 图片存储在哪里？
A: 图片存储在 Supabase Storage 的 `case-images` 存储桶中，获取公共URL后保存到数据库。

### Q: 如何备份数据？
A: 在 Supabase Dashboard > Database > Backups 可以创建和恢复备份。

### Q: 如何重置数据库？
A: 通过 SQL Editor 执行 `DROP TABLE` 命令删除所有表，然后重新运行迁移文件。

---

## 技术支持

如有问题，请参考：
- Supabase 官方文档: https://supabase.com/docs
- 项目源代码: `/src/lib/supabase.ts`
- 迁移文件: `/supabase/migrations/`

---

**最后更新日期：** 2026-03-06
**版本：** 1.0
