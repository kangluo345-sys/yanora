# YANORA 新账号快速设置检查清单

按照此清单步骤操作，可在30分钟内完成新 Supabase 账号的完整设置。

---

## 📝 准备工作

- [ ] 已创建新的 Supabase 项目
- [ ] 已获取项目 URL 和 anon key
- [ ] 已准备好要上传的图片素材
- [ ] 已阅读 `DATABASE_SETUP_GUIDE.md`

---

## 第一步：配置环境变量 (2分钟)

### 1.1 更新 `.env` 文件

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**位置：** 项目根目录 `.env` 文件

**检查：**
- [ ] URL 格式正确（以 .supabase.co 结尾）
- [ ] Anon key 已正确复制（长字符串）
- [ ] 保存文件后重启开发服务器

---

## 第二步：运行数据库迁移 (5分钟)

### 2.1 打开 Supabase SQL Editor

1. 进入 Supabase Dashboard
2. 点击左侧 "SQL Editor"
3. 点击 "New query"

### 2.2 按顺序执行迁移文件

依次复制并执行以下文件内容：

#### 必需迁移（按顺序）：

1. **`20260304065333_create_admin_system.sql`**
   - [ ] 创建 admins 表
   - [ ] 创建 is_admin() 函数
   - [ ] 执行成功

2. **`20260305032359_create_profile_trigger.sql`**
   - [ ] 创建 profiles 表
   - [ ] 创建自动创建 profile 触发器
   - [ ] 执行成功

3. **`20260304065359_create_bookings_system.sql`**
   - [ ] 创建 bookings 表
   - [ ] 创建 booking_services 表
   - [ ] 设置 RLS 策略
   - [ ] 执行成功

4. **`20260304065420_create_case_studies_table.sql`**
   - [ ] 创建 case_studies 表
   - [ ] 设置 RLS 策略
   - [ ] 执行成功

5. **`20260304131205_simplify_case_studies_and_create_detailed_cases.sql`**
   - [ ] 简化 case_studies 表
   - [ ] 创建 detailed_cases 表
   - [ ] 设置 RLS 策略
   - [ ] 执行成功

6. **`20260304122117_create_testimonials_table.sql`**
   - [ ] 创建 testimonials 表
   - [ ] 设置 RLS 策略
   - [ ] 执行成功

7. **`20260304072700_create_faq_table.sql`**
   - [ ] 创建 faqs 表
   - [ ] 设置 RLS 策略
   - [ ] 执行成功

8. **`20260304065442_create_payments_table.sql`**
   - [ ] 创建 payments 表
   - [ ] 设置 RLS 策略
   - [ ] 执行成功

### 2.3 验证表创建

在 SQL Editor 中运行：

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
```

**应该看到：**
- [ ] admins
- [ ] bookings
- [ ] booking_services
- [ ] case_studies
- [ ] detailed_cases
- [ ] faqs
- [ ] payments
- [ ] profiles
- [ ] testimonials

---

## 第三步：创建存储桶 (3分钟)

### 3.1 创建 case-images 存储桶

1. 进入 Storage
2. 点击 "New bucket"
3. 名称：`case-images`
4. **勾选 "Public bucket"**
5. 点击 "Create bucket"

- [ ] 存储桶创建成功
- [ ] 已设置为 Public

### 3.2 设置存储桶策略

在 Storage > case-images > Policies，添加以下策略：

#### 策略 1: 公共读取

```sql
CREATE POLICY "Anyone can view case images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'case-images');
```

- [ ] 公共读取策略创建成功

#### 策略 2: 管理员上传

```sql
CREATE POLICY "Admins can upload case images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'case-images'
  AND is_admin(auth.uid())
);
```

- [ ] 管理员上传策略创建成功

#### 策略 3: 管理员更新

```sql
CREATE POLICY "Admins can update case images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'case-images'
  AND is_admin(auth.uid())
)
WITH CHECK (
  bucket_id = 'case-images'
  AND is_admin(auth.uid())
);
```

- [ ] 管理员更新策略创建成功

#### 策略 4: 管理员删除

```sql
CREATE POLICY "Admins can delete case images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'case-images'
  AND is_admin(auth.uid())
);
```

- [ ] 管理员删除策略创建成功

---

## 第四步：创建管理员账号 (5分钟)

### 4.1 在 Supabase 创建用户

1. 进入 Authentication > Users
2. 点击 "Add user" > "Create new user"
3. 输入：
   - Email: `admin@yanora.com` (或您的邮箱)
   - Password: 创建一个强密码
   - **勾选 "Auto Confirm User"**
4. 点击 "Create user"
5. **复制生成的 User ID**

- [ ] 用户创建成功
- [ ] 已复制 User ID

### 4.2 添加到管理员表

在 SQL Editor 执行（替换下面的值）：

```sql
-- 替换 'your-user-id' 为刚才复制的 User ID
-- 替换 'your-email' 为您的邮箱
INSERT INTO admins (id, email, username, is_active)
VALUES (
  'your-user-id',
  'your-email@example.com',
  'admin',
  true
);
```

- [ ] 管理员添加成功

### 4.3 验证管理员权限

```sql
-- 检查管理员
SELECT * FROM admins;

-- 测试 is_admin 函数
SELECT is_admin('your-user-id');  -- 应该返回 true
```

- [ ] 管理员验证成功

---

## 第五步：导入示例数据 (5分钟)

### 5.1 运行快速数据导入脚本

在 SQL Editor 中执行 `quick-data-import.sql` 文件内容

- [ ] FAQs 导入成功
- [ ] 简单案例导入成功
- [ ] 详细案例导入成功
- [ ] 客户评价导入成功

### 5.2 验证数据导入

```sql
-- 检查 FAQs
SELECT COUNT(*) as faq_count FROM faqs;
-- 应该有 16 条

-- 检查简单案例
SELECT COUNT(*) as case_count FROM case_studies;
-- 应该有 4 条

-- 检查详细案例
SELECT COUNT(*) as detailed_case_count FROM detailed_cases;
-- 应该有若干条

-- 检查评价
SELECT COUNT(*) as testimonial_count FROM testimonials;
-- 应该有 5 条
```

- [ ] 所有数据验证成功

---

## 第六步：上传图片资源 (10分钟)

### 6.1 准备图片

确保您有以下图片：
- [ ] 案例前后对比图
- [ ] 客户评价图片
- [ ] 其他展示图片

### 6.2 通过管理后台上传

1. 使用管理员账号登录前端应用
2. 进入管理后台
3. 上传图片到各个模块

**或者直接通过 Supabase Storage 上传：**

1. 进入 Storage > case-images
2. 点击 "Upload file"
3. 选择并上传图片

- [ ] 所有图片上传成功

### 6.3 更新数据库中的图片 URL

上传后，更新相应表中的图片 URL：

```sql
-- 示例：更新案例图片
UPDATE case_studies
SET before_image_url = 'https://your-project.supabase.co/storage/v1/object/public/case-images/before1.jpg',
    after_image_url = 'https://your-project.supabase.co/storage/v1/object/public/case-images/after1.jpg'
WHERE id = 'case-id';
```

- [ ] 所有图片 URL 更新完成

---

## 第七步：测试功能 (5分钟)

### 7.1 测试公共访问

在浏览器无痕模式下测试：

- [ ] 首页加载正常
- [ ] 案例展示正常
- [ ] FAQ 页面正常
- [ ] 客户评价显示正常
- [ ] 预约表单可以提交

### 7.2 测试管理员功能

使用管理员账号登录：

- [ ] 管理后台可以访问
- [ ] 可以查看预约列表
- [ ] 可以添加/编辑案例
- [ ] 可以添加/编辑 FAQ
- [ ] 可以添加/编辑评价
- [ ] 可以上传图片

### 7.3 测试数据库查询

在前端控制台测试：

```javascript
// 测试案例查询
const { data: cases } = await supabase
  .from('case_studies')
  .select('*');
console.log('Cases:', cases);

// 测试 FAQ 查询
const { data: faqs } = await supabase
  .from('faqs')
  .select('*')
  .eq('is_active', true);
console.log('FAQs:', faqs);

// 测试管理员权限
const { data: isAdmin } = await supabase
  .rpc('is_admin', { user_id: 'your-user-id' });
console.log('Is Admin:', isAdmin);
```

- [ ] 所有查询正常工作

---

## 第八步：性能优化 (可选)

### 8.1 创建索引

如果还没有，确保已创建性能索引：

```sql
-- Bookings 索引
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at DESC);

-- Cases 索引
CREATE INDEX IF NOT EXISTS idx_detailed_cases_category ON detailed_cases(category);
CREATE INDEX IF NOT EXISTS idx_detailed_cases_published ON detailed_cases(is_published);

-- FAQs 索引
CREATE INDEX IF NOT EXISTS idx_faqs_category ON faqs(category);
CREATE INDEX IF NOT EXISTS idx_faqs_is_active ON faqs(is_active);

-- Testimonials 索引
CREATE INDEX IF NOT EXISTS idx_testimonials_is_active ON testimonials(is_active);
CREATE INDEX IF NOT EXISTS idx_testimonials_display_order ON testimonials(display_order);
```

- [ ] 所有索引创建成功

---

## 第九步：备份和文档 (可选)

### 9.1 创建数据库备份

1. 进入 Database > Backups
2. 点击 "Create backup"
3. 输入备份名称：`initial-setup-2026-03-06`

- [ ] 备份创建成功

### 9.2 保存关键信息

创建一个安全的文档记录：

```
项目信息：
- Supabase URL: https://...
- Anon Key: eyJ...
- 管理员邮箱: admin@yanora.com
- 创建日期: 2026-03-06

数据库表：
- 9 个主要表已创建
- 所有 RLS 策略已设置
- 存储桶已配置

初始数据：
- 16 个 FAQs
- 4 个简单案例
- X 个详细案例
- 5 个客户评价
```

- [ ] 关键信息已记录

---

## 完成检查

### 最终验证

- [ ] 所有数据库表已创建
- [ ] 所有 RLS 策略已设置
- [ ] 存储桶已配置并可用
- [ ] 至少有一个管理员账号
- [ ] 示例数据已导入
- [ ] 图片已上传并正确显示
- [ ] 公共页面功能正常
- [ ] 管理后台功能正常
- [ ] 已创建数据库备份
- [ ] 环境变量已正确配置

---

## 常见问题排查

### Q1: 迁移执行失败

**检查：**
- SQL 语法是否完整
- 是否按正确顺序执行
- 依赖的表/函数是否已存在

**解决：**
```sql
-- 查看错误详情
SELECT * FROM pg_stat_statements ORDER BY calls DESC LIMIT 10;

-- 重置并重新执行
DROP TABLE IF EXISTS table_name CASCADE;
-- 然后重新运行迁移
```

### Q2: 管理员无法登录后台

**检查：**
- 用户是否在 admins 表中
- is_active 是否为 true
- is_admin() 函数是否返回 true

**解决：**
```sql
-- 检查管理员状态
SELECT * FROM admins WHERE email = 'your-email';

-- 确保用户激活
UPDATE admins SET is_active = true WHERE email = 'your-email';
```

### Q3: 图片无法显示

**检查：**
- 存储桶是否设置为 Public
- 公共读取策略是否创建
- 图片 URL 是否正确

**解决：**
```sql
-- 检查存储策略
SELECT * FROM storage.policies WHERE bucket_id = 'case-images';

-- 测试图片 URL
-- 在浏览器中直接访问图片 URL
```

### Q4: 预约功能不工作

**检查：**
- bookings 表 RLS 策略
- 是否允许 public 插入
- 网络请求是否成功

**解决：**
```sql
-- 检查策略
SELECT * FROM pg_policies WHERE tablename = 'bookings';

-- 临时测试（仅用于调试）
ALTER TABLE bookings DISABLE ROW LEVEL SECURITY;
-- 测试完成后记得重新启用
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
```

---

## 下一步

设置完成后，您可以：

1. **自定义数据**
   - 修改 FAQ 内容
   - 添加真实案例
   - 更新客户评价

2. **配置 Edge Functions**
   - 设置邮件通知
   - 配置支付接口
   - 添加其他自动化功能

3. **优化性能**
   - 启用 CDN
   - 配置缓存策略
   - 优化图片大小

4. **部署上线**
   - 配置自定义域名
   - 设置 SSL 证书
   - 配置生产环境变量

---

## 参考文档

- `DATABASE_SETUP_GUIDE.md` - 完整数据库文档
- `API_REFERENCE.md` - API 接口参考
- `quick-data-import.sql` - 快速数据导入脚本
- Supabase 官方文档: https://supabase.com/docs

---

**设置完成日期：** _______________

**设置人员：** _______________

**备注：** _______________

---

✅ **恭喜！您的 YANORA 系统已成功设置！**
