# YANORA API 参考文档

完整的前端数据接口调用指南和 TypeScript 类型定义。

---

## 目录

1. [TypeScript 类型定义](#typescript-类型定义)
2. [预约管理 API](#预约管理-api)
3. [案例管理 API](#案例管理-api)
4. [评价管理 API](#评价管理-api)
5. [FAQ 管理 API](#faq-管理-api)
6. [用户管理 API](#用户管理-api)
7. [管理员 API](#管理员-api)
8. [图片上传 API](#图片上传-api)

---

## TypeScript 类型定义

### 数据库表类型

```typescript
// 用户资料
interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

// 管理员
interface Admin {
  id: string;
  email: string;
  username: string;
  is_active: boolean;
  created_at: string;
}

// 预约
interface Booking {
  id: string;
  user_id: string | null;
  name: string;
  email: string;
  phone: string;
  service_type: string;
  preferred_date: string;
  preferred_time: string;
  message: string | null;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  payment_method: 'PayPal' | '银行卡' | '微信支付' | '支付宝' | null;
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  total_amount: number;
  created_at: string;
  updated_at: string;
}

// 预约服务明细
interface BookingService {
  id: string;
  booking_id: string;
  service_name: string;
  service_price: number;
  created_at: string;
}

// 预约完整信息（包含服务明细）
interface BookingWithServices extends Booking {
  booking_services: BookingService[];
}

// 简单案例
interface CaseStudy {
  id: string;
  before_image_url: string;
  after_image_url: string;
  display_order: number;
  created_at: string;
}

// 详细案例
interface DetailedCase {
  id: string;
  title: string;
  title_en: string;
  description: string;
  description_en: string;
  before_image_url: string;
  after_image_url: string;
  category: string;
  show_in_facial: boolean;
  show_in_dental: boolean;
  show_in_injection: boolean;
  show_in_body: boolean;
  show_in_hair: boolean;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

// 客户评价
interface Testimonial {
  id: string;
  image1_url: string;
  image2_url: string;
  image3_url: string;
  message: string;
  customer_name: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// FAQ
interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// 支付记录
interface Payment {
  id: string;
  booking_id: string | null;
  user_id: string | null;
  amount: number;
  payment_method: string;
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded';
  transaction_id: string | null;
  created_at: string;
  updated_at: string;
}
```

---

## 预约管理 API

### 1. 创建预约（公共接口）

任何人都可以创建预约，包括未登录用户。

```typescript
import { supabase } from './lib/supabase';

interface CreateBookingData {
  name: string;
  email: string;
  phone: string;
  service_type: string;
  preferred_date: string; // YYYY-MM-DD
  preferred_time: string;
  message?: string;
  payment_method?: 'PayPal' | '银行卡' | '微信支付' | '支付宝';
  total_amount?: number;
}

async function createBooking(data: CreateBookingData) {
  const { data: booking, error } = await supabase
    .from('bookings')
    .insert({
      user_id: (await supabase.auth.getUser()).data.user?.id || null,
      ...data,
    })
    .select()
    .single();

  if (error) throw error;
  return booking;
}

// 使用示例
const newBooking = await createBooking({
  name: '张三',
  email: 'zhangsan@example.com',
  phone: '+86 138 0000 0000',
  service_type: '面部轮廓',
  preferred_date: '2026-03-20',
  preferred_time: '上午 10:00-12:00',
  message: '想咨询鼻部整形',
  payment_method: '微信支付',
  total_amount: 100.00,
});
```

### 2. 添加预约服务明细

```typescript
interface AddBookingServiceData {
  booking_id: string;
  service_name: string;
  service_price: number;
}

async function addBookingService(data: AddBookingServiceData) {
  const { data: service, error } = await supabase
    .from('booking_services')
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return service;
}

// 批量添加服务
async function addBookingServices(
  bookingId: string,
  services: { name: string; price: number }[]
) {
  const servicesToInsert = services.map(s => ({
    booking_id: bookingId,
    service_name: s.name,
    service_price: s.price,
  }));

  const { data, error } = await supabase
    .from('booking_services')
    .insert(servicesToInsert)
    .select();

  if (error) throw error;
  return data;
}
```

### 3. 查询用户自己的预约

```typescript
async function getMyBookings(): Promise<BookingWithServices[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, booking_services(*)')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

// 查询单个预约
async function getBookingById(id: string): Promise<BookingWithServices> {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, booking_services(*)')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}
```

### 4. 更新预约状态（用户或管理员）

```typescript
interface UpdateBookingData {
  status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  payment_status?: 'pending' | 'paid' | 'failed' | 'refunded';
  preferred_date?: string;
  preferred_time?: string;
  message?: string;
}

async function updateBooking(id: string, data: UpdateBookingData) {
  const { data: booking, error } = await supabase
    .from('bookings')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return booking;
}

// 取消预约
async function cancelBooking(id: string) {
  return updateBooking(id, { status: 'cancelled' });
}
```

### 5. 管理员查询所有预约

```typescript
// 获取所有预约
async function getAllBookings(): Promise<BookingWithServices[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, booking_services(*)')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

// 按状态筛选
async function getBookingsByStatus(
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
): Promise<BookingWithServices[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, booking_services(*)')
    .eq('status', status)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

// 按日期范围查询
async function getBookingsByDateRange(
  startDate: string,
  endDate: string
): Promise<BookingWithServices[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, booking_services(*)')
    .gte('preferred_date', startDate)
    .lte('preferred_date', endDate)
    .order('preferred_date', { ascending: true });

  if (error) throw error;
  return data;
}
```

---

## 案例管理 API

### 1. 简单案例（首页展示）

```typescript
// 获取所有简单案例
async function getCaseStudies(): Promise<CaseStudy[]> {
  const { data, error } = await supabase
    .from('case_studies')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) throw error;
  return data;
}

// 管理员创建案例
async function createCaseStudy(data: {
  before_image_url: string;
  after_image_url: string;
  display_order?: number;
}) {
  const { data: caseStudy, error } = await supabase
    .from('case_studies')
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return caseStudy;
}

// 管理员更新案例
async function updateCaseStudy(id: string, data: {
  before_image_url?: string;
  after_image_url?: string;
  display_order?: number;
}) {
  const { data: caseStudy, error } = await supabase
    .from('case_studies')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return caseStudy;
}

// 管理员删除案例
async function deleteCaseStudy(id: string) {
  const { error } = await supabase
    .from('case_studies')
    .delete()
    .eq('id', id);

  if (error) throw error;
}
```

### 2. 详细案例

```typescript
// 获取所有已发布案例
async function getPublishedDetailedCases(): Promise<DetailedCase[]> {
  const { data, error } = await supabase
    .from('detailed_cases')
    .select('*')
    .eq('is_published', true)
    .order('display_order', { ascending: true });

  if (error) throw error;
  return data;
}

// 按分类查询
async function getDetailedCasesByCategory(category: string): Promise<DetailedCase[]> {
  const { data, error } = await supabase
    .from('detailed_cases')
    .select('*')
    .eq('category', category)
    .eq('is_published', true)
    .order('display_order', { ascending: true });

  if (error) throw error;
  return data;
}

// 查询特定页面的案例
async function getCasesByPage(page: 'facial' | 'dental' | 'injection' | 'body' | 'hair'): Promise<DetailedCase[]> {
  const columnMap = {
    facial: 'show_in_facial',
    dental: 'show_in_dental',
    injection: 'show_in_injection',
    body: 'show_in_body',
    hair: 'show_in_hair',
  };

  const { data, error } = await supabase
    .from('detailed_cases')
    .select('*')
    .eq(columnMap[page], true)
    .eq('is_published', true)
    .order('display_order', { ascending: true });

  if (error) throw error;
  return data;
}

// 管理员创建详细案例
interface CreateDetailedCaseData {
  title: string;
  title_en: string;
  description: string;
  description_en: string;
  before_image_url: string;
  after_image_url: string;
  category: string;
  show_in_facial?: boolean;
  show_in_dental?: boolean;
  show_in_injection?: boolean;
  show_in_body?: boolean;
  show_in_hair?: boolean;
  display_order?: number;
  is_published?: boolean;
}

async function createDetailedCase(data: CreateDetailedCaseData) {
  const { data: detailedCase, error } = await supabase
    .from('detailed_cases')
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return detailedCase;
}

// 管理员更新详细案例
async function updateDetailedCase(id: string, data: Partial<CreateDetailedCaseData>) {
  const { data: detailedCase, error } = await supabase
    .from('detailed_cases')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return detailedCase;
}

// 管理员删除详细案例
async function deleteDetailedCase(id: string) {
  const { error } = await supabase
    .from('detailed_cases')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// 管理员查看所有案例（包括未发布）
async function getAllDetailedCases(): Promise<DetailedCase[]> {
  const { data, error } = await supabase
    .from('detailed_cases')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) throw error;
  return data;
}
```

---

## 评价管理 API

### 1. 获取评价

```typescript
// 获取所有激活的评价
async function getActiveTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) throw error;
  return data;
}
```

### 2. 管理员管理评价

```typescript
// 创建评价
interface CreateTestimonialData {
  image1_url: string;
  image2_url: string;
  image3_url: string;
  message: string;
  customer_name: string;
  display_order?: number;
  is_active?: boolean;
}

async function createTestimonial(data: CreateTestimonialData) {
  const { data: testimonial, error } = await supabase
    .from('testimonials')
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return testimonial;
}

// 更新评价
async function updateTestimonial(id: string, data: Partial<CreateTestimonialData>) {
  const { data: testimonial, error } = await supabase
    .from('testimonials')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return testimonial;
}

// 删除评价
async function deleteTestimonial(id: string) {
  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// 切换激活状态
async function toggleTestimonialActive(id: string, isActive: boolean) {
  return updateTestimonial(id, { is_active: isActive });
}

// 管理员查看所有评价
async function getAllTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) throw error;
  return data;
}
```

---

## FAQ 管理 API

### 1. 获取 FAQ

```typescript
// 获取所有激活的 FAQ
async function getActiveFAQs(): Promise<FAQ[]> {
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) throw error;
  return data;
}

// 按分类获取 FAQ
async function getFAQsByCategory(category: string): Promise<FAQ[]> {
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .eq('category', category)
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) throw error;
  return data;
}

// 获取所有分类
async function getFAQCategories(): Promise<string[]> {
  const { data, error } = await supabase
    .from('faqs')
    .select('category')
    .eq('is_active', true);

  if (error) throw error;

  // 去重
  const categories = [...new Set(data.map(faq => faq.category))];
  return categories;
}
```

### 2. 管理员管理 FAQ

```typescript
// 创建 FAQ
interface CreateFAQData {
  category: string;
  question: string;
  answer: string;
  display_order?: number;
  is_active?: boolean;
}

async function createFAQ(data: CreateFAQData) {
  const { data: faq, error } = await supabase
    .from('faqs')
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return faq;
}

// 更新 FAQ
async function updateFAQ(id: string, data: Partial<CreateFAQData>) {
  const { data: faq, error } = await supabase
    .from('faqs')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return faq;
}

// 删除 FAQ
async function deleteFAQ(id: string) {
  const { error } = await supabase
    .from('faqs')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// 管理员查看所有 FAQ
async function getAllFAQs(): Promise<FAQ[]> {
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .order('category', { ascending: true })
    .order('display_order', { ascending: true });

  if (error) throw error;
  return data;
}
```

---

## 用户管理 API

### 1. 用户认证

```typescript
// 注册
async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

// 登录
async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

// 登出
async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// 获取当前用户
async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
}

// 重置密码
async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });

  if (error) throw error;
}

// 更新密码
async function updatePassword(newPassword: string) {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) throw error;
}
```

### 2. 用户资料

```typescript
// 获取用户资料
async function getProfile(userId: string): Promise<Profile> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
}

// 更新用户资料
async function updateProfile(userId: string, data: {
  full_name?: string;
  phone?: string;
}) {
  const { data: profile, error } = await supabase
    .from('profiles')
    .update(data)
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return profile;
}
```

---

## 管理员 API

### 1. 检查管理员权限

```typescript
async function isAdmin(userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .rpc('is_admin', { user_id: userId });

  if (error) return false;
  return data;
}

// 获取当前用户的管理员状态
async function checkCurrentUserAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user) return false;
  return isAdmin(user.id);
}
```

### 2. 管理员列表

```typescript
// 获取所有管理员
async function getAllAdmins(): Promise<Admin[]> {
  const { data, error } = await supabase
    .from('admins')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

// 获取激活的管理员
async function getActiveAdmins(): Promise<Admin[]> {
  const { data, error } = await supabase
    .from('admins')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}
```

---

## 图片上传 API

### 1. 上传图片到存储桶

```typescript
// 上传单个图片
async function uploadImage(
  file: File,
  bucket: string = 'case-images'
): Promise<string> {
  const fileName = `${Date.now()}_${file.name}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file);

  if (error) throw error;

  // 获取公共 URL
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName);

  return publicUrl;
}

// 批量上传图片
async function uploadImages(
  files: File[],
  bucket: string = 'case-images'
): Promise<string[]> {
  const uploadPromises = files.map(file => uploadImage(file, bucket));
  return Promise.all(uploadPromises);
}

// 删除图片
async function deleteImage(filePath: string, bucket: string = 'case-images') {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([filePath]);

  if (error) throw error;
}

// 从 URL 提取文件路径
function extractFilePathFromUrl(url: string): string {
  const parts = url.split('/');
  return parts[parts.length - 1];
}
```

### 2. 完整的图片上传示例（带预览）

```typescript
interface UploadImageWithPreviewOptions {
  file: File;
  bucket?: string;
  maxSize?: number; // MB
  onProgress?: (progress: number) => void;
}

async function uploadImageWithPreview({
  file,
  bucket = 'case-images',
  maxSize = 5,
  onProgress,
}: UploadImageWithPreviewOptions): Promise<string> {
  // 验证文件大小
  if (file.size > maxSize * 1024 * 1024) {
    throw new Error(`文件大小不能超过 ${maxSize}MB`);
  }

  // 验证文件类型
  if (!file.type.startsWith('image/')) {
    throw new Error('只能上传图片文件');
  }

  // 生成唯一文件名
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

  // 上传文件
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw error;

  // 获取公共 URL
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName);

  return publicUrl;
}
```

---

## 实用工具函数

### 1. 数据验证

```typescript
// 验证邮箱
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// 验证电话号码（支持国际格式）
function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s\-()]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// 验证日期格式
function isValidDate(date: string): boolean {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) return false;

  const dateObj = new Date(date);
  return !isNaN(dateObj.getTime());
}
```

### 2. 错误处理

```typescript
interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

function handleSupabaseError(error: any): ApiError {
  if (error.code === 'PGRST116') {
    return {
      message: '数据不存在',
      code: 'NOT_FOUND',
    };
  }

  if (error.code === '23505') {
    return {
      message: '数据已存在',
      code: 'DUPLICATE',
    };
  }

  if (error.code === '42501') {
    return {
      message: '权限不足',
      code: 'PERMISSION_DENIED',
    };
  }

  return {
    message: error.message || '操作失败',
    code: error.code,
    details: error,
  };
}
```

### 3. 日期格式化

```typescript
// 格式化日期为 YYYY-MM-DD
function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString().split('T')[0];
}

// 格式化时间戳为可读格式
function formatDateTime(timestamp: string, locale: string = 'zh-CN'): string {
  const date = new Date(timestamp);
  return date.toLocaleString(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}
```

---

## 完整使用示例

### 用户预约流程

```typescript
// 1. 用户填写预约表单
async function submitBooking(formData: {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
}) {
  try {
    // 验证数据
    if (!isValidEmail(formData.email)) {
      throw new Error('邮箱格式不正确');
    }

    if (!isValidPhone(formData.phone)) {
      throw new Error('电话号码格式不正确');
    }

    // 创建预约
    const booking = await createBooking({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service_type: formData.serviceType,
      preferred_date: formData.preferredDate,
      preferred_time: formData.preferredTime,
      message: formData.message,
      total_amount: 100.00, // 咨询费
      payment_method: '微信支付',
    });

    // 添加服务明细
    await addBookingService({
      booking_id: booking.id,
      service_name: '初诊咨询',
      service_price: 100.00,
    });

    return {
      success: true,
      bookingId: booking.id,
      message: '预约成功！我们会尽快与您联系。',
    };
  } catch (error: any) {
    const apiError = handleSupabaseError(error);
    return {
      success: false,
      message: apiError.message,
    };
  }
}
```

### 管理员案例管理流程

```typescript
// 管理员添加详细案例
async function adminAddDetailedCase(
  caseData: {
    title: string;
    titleEn: string;
    description: string;
    descriptionEn: string;
    category: string;
    pages: string[]; // ['facial', 'dental']
  },
  beforeImage: File,
  afterImage: File
) {
  try {
    // 1. 检查管理员权限
    const isAdminUser = await checkCurrentUserAdmin();
    if (!isAdminUser) {
      throw new Error('无管理员权限');
    }

    // 2. 上传图片
    const [beforeUrl, afterUrl] = await Promise.all([
      uploadImage(beforeImage),
      uploadImage(afterImage),
    ]);

    // 3. 创建案例
    const detailedCase = await createDetailedCase({
      title: caseData.title,
      title_en: caseData.titleEn,
      description: caseData.description,
      description_en: caseData.descriptionEn,
      before_image_url: beforeUrl,
      after_image_url: afterUrl,
      category: caseData.category,
      show_in_facial: caseData.pages.includes('facial'),
      show_in_dental: caseData.pages.includes('dental'),
      show_in_injection: caseData.pages.includes('injection'),
      show_in_body: caseData.pages.includes('body'),
      show_in_hair: caseData.pages.includes('hair'),
      is_published: true,
    });

    return {
      success: true,
      case: detailedCase,
      message: '案例添加成功',
    };
  } catch (error: any) {
    const apiError = handleSupabaseError(error);
    return {
      success: false,
      message: apiError.message,
    };
  }
}
```

---

## 注意事项

1. **错误处理**: 所有数据库操作都应包装在 try-catch 中
2. **类型安全**: 使用 TypeScript 类型定义确保类型安全
3. **权限检查**: 管理员操作前先检查权限
4. **数据验证**: 在提交前验证用户输入
5. **图片优化**: 上传前压缩大图片
6. **缓存策略**: 合理使用数据缓存减少请求
7. **实时更新**: 使用 Supabase Realtime 监听数据变化

---

**最后更新：** 2026-03-06
