/*
  # 修复预订表的可选字段

  ## 概述
  将预订表中的日期和时间字段改为可选，以支持用户在预订时不指定具体日期和时间。

  ## 修改内容
  
  ### 修改的表
  - `bookings`
    - `preferred_date` - 从 NOT NULL 改为可选（nullable）
    - `preferred_time` - 从 NOT NULL 改为可选（nullable）

  ## 原因
  - 用户可能希望先预订，然后由客服联系确定具体时间
  - 提高用户体验，降低预订门槛
  - 允许更灵活的预订流程

  ## 安全性
  - 不影响现有的 RLS 策略
  - 保持数据完整性
*/

-- 将 preferred_date 改为可选
ALTER TABLE bookings ALTER COLUMN preferred_date DROP NOT NULL;

-- 将 preferred_time 改为可选
ALTER TABLE bookings ALTER COLUMN preferred_time DROP NOT NULL;
