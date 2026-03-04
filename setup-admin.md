# 创建管理员账号指南

由于安全原因，Supabase 不允许通过 SQL 直接创建认证用户。你需要通过以下步骤创建管理员账号：

## 方法 1: 使用 Supabase Dashboard（推荐）

1. 登录到你的 Supabase 项目 Dashboard
2. 进入 **Authentication** > **Users**
3. 点击 **Add user** 按钮
4. 填写以下信息：
   - **Email**: `admin@yanora.com`
   - **Password**: `Admin123456`
   - 勾选 **Auto Confirm User**（自动确认用户）
5. 点击 **Create user**
6. 复制创建的用户 ID
7. 进入 **SQL Editor**，执行以下 SQL（替换 `USER_ID`）：

```sql
INSERT INTO admins (id, email, role, is_active)
VALUES (
  'USER_ID'::uuid,  -- 替换为步骤 6 复制的用户 ID
  'admin@yanora.com',
  'super_admin',
  true
);
```

## 方法 2: 通过用户注册后提升权限

1. 在网站前端注册一个普通用户账号（使用 admin@yanora.com）
2. 在 Supabase Dashboard 进入 **SQL Editor**
3. 执行以下 SQL（替换邮箱为你注册的邮箱）：

```sql
-- 查找用户 ID
SELECT id, email FROM auth.users WHERE email = 'admin@yanora.com';

-- 使用查到的 ID 创建管理员记录
INSERT INTO admins (id, email, role, is_active)
SELECT
  id,
  email,
  'super_admin',
  true
FROM auth.users
WHERE email = 'admin@yanora.com';
```

## 登录信息

创建完成后，使用以下信息登录管理后台：

- **后台地址**: `/admin/login`
- **邮箱**: `admin@yanora.com`
- **密码**: `Admin123456`（如果你使用了默认密码）
- **角色**: Super Admin（超级管理员）

## 注意事项

- 首次登录后，请立即修改密码
- Super Admin 可以管理其他管理员
- 确保妥善保管管理员凭据
