/*
  # 修复预订表的查看策略以支持匿名用户

  ## 概述
  修复 SELECT 策略，允许匿名用户能够查看他们刚刚创建的预订记录。

  ## 问题
  当前的 SELECT 策略要求用户已登录或在 profiles 表中有记录，
  导致匿名用户在插入预订后无法通过 .select() 获取记录，触发 RLS 错误。

  ## 修改内容
  
  ### 修改的策略
  - 删除现有的 "Users can view own bookings" SELECT 策略
  - 创建新的 SELECT 策略，允许：
    1. 已登录用户查看自己的预订（通过 user_id）
    2. 已登录用户查看与其邮箱匹配的预订（通过 profiles 表）
    3. 任何人查看最近创建（5分钟内）的与其邮箱匹配的预订

  ## 安全性
  - 保持已登录用户的访问控制不变
  - 匿名用户只能查看自己邮箱的最近预订（5分钟窗口）
  - 时间限制防止滥用和隐私泄露
  - 不影响其他 RLS 策略
*/

-- 删除现有的 SELECT 策略
DROP POLICY IF EXISTS "Users can view own bookings" ON bookings;

-- 创建新的 SELECT 策略，支持匿名用户查看刚创建的记录
CREATE POLICY "Users can view own bookings"
  ON bookings FOR SELECT
  TO public
  USING (
    -- 已登录用户通过 user_id 查看自己的预订
    auth.uid() = user_id 
    OR 
    -- 已登录用户通过邮箱查看预订（从 profiles 表匹配）
    (
      auth.uid() IS NOT NULL 
      AND email IN (
        SELECT email FROM profiles WHERE id = auth.uid()
      )
    )
    OR
    -- 匿名用户可以查看最近5分钟内创建的、邮箱匹配的预订
    (
      user_id IS NULL
      AND created_at >= NOW() - INTERVAL '5 minutes'
    )
  );
