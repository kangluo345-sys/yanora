-- 创建管理员账号的 SQL 脚本
-- 注意：这需要在 Supabase Dashboard 的 SQL Editor 中执行

-- 步骤 1: 首先需要通过 Supabase Auth 创建用户
-- 在 Supabase Dashboard > Authentication > Users 中手动添加用户：
-- Email: admin@yanora.com
-- Password: Admin123456
-- 或者使用下面的 SQL 插入（需要先获取加密的密码）

-- 步骤 2: 创建管理员记录
-- 将下面的 'USER_ID_HERE' 替换为实际创建的用户 ID
INSERT INTO admins (id, email, role, is_active)
VALUES (
  'USER_ID_HERE'::uuid,
  'admin@yanora.com',
  'super_admin',
  true
);
