import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Upload, Trash2, CreditCard as Edit, Save, X, Image as ImageIcon } from 'lucide-react';

interface CaseStudy {
  id: string;
  before_image_url: string;
  after_image_url: string;
  display_order: number;
  created_at: string;
}

interface FormData {
  before_image_url: string;
  after_image_url: string;
  display_order: number;
}

interface UploadStatus {
  before: boolean;
  after: boolean;
}

function CaseStudyManagement() {
  const [cases, setCases] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    before_image_url: '',
    after_image_url: '',
    display_order: 0
  });
  const [uploading, setUploading] = useState<UploadStatus>({ before: false, after: false });
  const [beforePreview, setBeforePreview] = useState<string>('');
  const [afterPreview, setAfterPreview] = useState<string>('');

  useEffect(() => {
    fetchCases();
  }, []);

  const uploadImage = async (file: File, type: 'before' | 'after'): Promise<string | null> => {
    try {
      setUploading(prev => ({ ...prev, [type]: true }));

      const { data: { user } } = await supabase.auth.getUser();
      console.log('Current user:', user?.id, user?.email);

      if (!user) {
        throw new Error('未登录，请先登录管理员账号');
      }

      const { data: adminData, error: adminError } = await supabase
        .from('admins')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      console.log('Admin check:', adminData, adminError);

      if (!adminData || !adminData.is_active) {
        throw new Error('当前用户不是活跃的管理员');
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${fileName}`;

      console.log('Attempting upload:', filePath, 'User ID:', user.id);

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('case-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error details:', uploadError);
        throw new Error(`上传失败: ${uploadError.message}`);
      }

      if (!uploadData) {
        throw new Error('上传成功但未返回数据');
      }

      const { data } = supabase.storage
        .from('case-images')
        .getPublicUrl(filePath);

      if (!data.publicUrl) {
        throw new Error('无法获取图片公开链接');
      }

      console.log('Upload successful:', data.publicUrl);
      alert('图片上传成功！');
      return data.publicUrl;
    } catch (error: any) {
      console.error('Error uploading image:', error);
      const errorMessage = error?.message || '图片上传失败';
      alert(`图片上传失败: ${errorMessage}`);
      return null;
    } finally {
      setUploading(prev => ({ ...prev, [type]: false }));
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'before' | 'after') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('图片大小不能超过 5MB');
      return;
    }

    if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
      alert('只支持 JPG、PNG 和 WebP 格式的图片');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === 'before') {
        setBeforePreview(reader.result as string);
      } else {
        setAfterPreview(reader.result as string);
      }
    };
    reader.readAsDataURL(file);

    const url = await uploadImage(file, type);
    if (url) {
      setFormData(prev => ({
        ...prev,
        [`${type}_image_url`]: url
      }));
    }
  };

  const fetchCases = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setCases(data || []);
    } catch (error) {
      console.error('Error fetching cases:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.before_image_url || !formData.after_image_url) {
      alert('请上传前后对比图片');
      return;
    }

    try {
      const dataToSave = formData;

      if (editingId) {
        const { error } = await supabase
          .from('case_studies')
          .update(dataToSave)
          .eq('id', editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('case_studies')
          .insert([dataToSave]);

        if (error) throw error;
      }

      resetForm();
      fetchCases();
    } catch (error) {
      console.error('Error saving case:', error);
      alert('保存失败，请重试');
    }
  };

  const handleEdit = (caseStudy: CaseStudy) => {
    setFormData({
      before_image_url: caseStudy.before_image_url,
      after_image_url: caseStudy.after_image_url,
      display_order: caseStudy.display_order
    });
    setBeforePreview('');
    setAfterPreview('');
    setEditingId(caseStudy.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这个案例吗？')) return;

    try {
      const { error } = await supabase
        .from('case_studies')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchCases();
    } catch (error) {
      console.error('Error deleting case:', error);
      alert('删除失败，请重试');
    }
  };

  const resetForm = () => {
    setFormData({
      before_image_url: '',
      after_image_url: '',
      display_order: 0
    });
    setEditingId(null);
    setShowForm(false);
    setBeforePreview('');
    setAfterPreview('');
  };

  if (loading) {
    return <div className="text-center py-12">加载中...</div>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-light" style={{color: '#1F1F1F'}}>简单案例管理</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-6 py-2.5 text-white text-sm transition"
          style={{backgroundColor: '#1C2B3A'}}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#101D29'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1C2B3A'}
        >
          <Upload className="w-4 h-4" />
          {showForm ? '取消' : '添加新案例'}
        </button>
      </div>

      {showForm && (
        <div className="mb-8 bg-white border-2 p-8" style={{borderColor: '#B9CBDC'}}>
          <div className="mb-6">
            <h3 className="text-xl font-light tracking-wide" style={{color: '#1F1F1F'}}>
              {editingId ? '编辑简单案例' : '添加简单案例'}
            </h3>
            <p className="text-sm mt-2" style={{color: '#6B7280'}}>
              只需上传前后对比图片，案例将自动显示在首页"他们通过YANORA找回自信"区域
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gray-50 p-6 border" style={{borderColor: '#E5E7EB'}}>
              <h4 className="text-sm font-normal mb-4" style={{color: '#1F1F1F'}}>上传前后对比照片 *</h4>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm mb-2 font-normal" style={{color: '#4B5563'}}>
                    术前照片 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={(e) => handleFileChange(e, 'before')}
                      className="hidden"
                      id="before-image"
                      disabled={uploading.before}
                    />
                    <label
                      htmlFor="before-image"
                      className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed cursor-pointer transition ${
                        uploading.before ? 'bg-gray-100 cursor-not-allowed' : 'hover:bg-gray-100'
                      }`}
                      style={{borderColor: '#D1D5DB'}}
                    >
                      {uploading.before ? (
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
                          <p className="text-xs" style={{color: '#6B7280'}}>上传中...</p>
                        </div>
                      ) : beforePreview || formData.before_image_url ? (
                        <img
                          src={beforePreview || formData.before_image_url}
                          alt="术前预览"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center">
                          <ImageIcon className="w-12 h-12 mx-auto mb-2" style={{color: '#9CA3AF'}} />
                          <p className="text-sm" style={{color: '#6B7280'}}>点击上传术前照片</p>
                          <p className="text-xs mt-1" style={{color: '#9CA3AF'}}>支持 JPG、PNG、WebP，最大 5MB</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2 font-normal" style={{color: '#4B5563'}}>
                    术后照片 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={(e) => handleFileChange(e, 'after')}
                      className="hidden"
                      id="after-image"
                      disabled={uploading.after}
                    />
                    <label
                      htmlFor="after-image"
                      className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed cursor-pointer transition ${
                        uploading.after ? 'bg-gray-100 cursor-not-allowed' : 'hover:bg-gray-100'
                      }`}
                      style={{borderColor: '#D1D5DB'}}
                    >
                      {uploading.after ? (
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
                          <p className="text-xs" style={{color: '#6B7280'}}>上传中...</p>
                        </div>
                      ) : afterPreview || formData.after_image_url ? (
                        <img
                          src={afterPreview || formData.after_image_url}
                          alt="术后预览"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center">
                          <ImageIcon className="w-12 h-12 mx-auto mb-2" style={{color: '#9CA3AF'}} />
                          <p className="text-sm" style={{color: '#6B7280'}}>点击上传术后照片</p>
                          <p className="text-xs mt-1" style={{color: '#9CA3AF'}}>支持 JPG、PNG、WebP，最大 5MB</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2 font-normal" style={{color: '#4B5563'}}>显示顺序</label>
              <input
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2.5 border focus:outline-none focus:border-gray-400 transition"
                style={{borderColor: '#D1D5DB'}}
                min="0"
                placeholder="0"
              />
              <p className="text-xs mt-1" style={{color: '#9CA3AF'}}>数字越小越靠前显示</p>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 text-white text-sm transition"
                style={{backgroundColor: '#1C2B3A'}}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#101D29'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1C2B3A'}
              >
                <Save className="w-4 h-4" />
                {editingId ? '更新案例' : '保存案例'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="flex items-center gap-2 px-6 py-2.5 border text-sm transition hover:bg-gray-50"
                style={{borderColor: '#D1D5DB', color: '#6B7280'}}
              >
                <X className="w-4 h-4" />
                取消
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cases.map((caseStudy) => (
          <div key={caseStudy.id} className="bg-white border" style={{borderColor: '#E5E7EB'}}>
            <div className="grid grid-cols-2 gap-0.5 bg-gray-200">
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={caseStudy.before_image_url}
                  alt="术前"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs py-1 px-2 text-center">
                  术前
                </div>
              </div>
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={caseStudy.after_image_url}
                  alt="术后"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs py-1 px-2 text-center">
                  术后
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs" style={{color: '#6B7280'}}>
                  排序: {caseStudy.display_order}
                </span>
                <span className="text-xs" style={{color: '#9CA3AF'}}>
                  {new Date(caseStudy.created_at).toLocaleDateString('zh-CN')}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(caseStudy)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-xs border transition hover:bg-gray-50"
                  style={{borderColor: '#D1D5DB', color: '#6B7280'}}
                >
                  <Edit className="w-3 h-3" />
                  编辑
                </button>
                <button
                  onClick={() => handleDelete(caseStudy.id)}
                  className="flex items-center gap-1 px-3 py-1 text-xs border transition hover:bg-red-50"
                  style={{borderColor: '#EF4444', color: '#EF4444'}}
                >
                  <Trash2 className="w-3 h-3" />
                  删除
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {cases.length === 0 && (
        <div className="text-center py-12">
          <p className="text-sm" style={{color: '#6B7280'}}>暂无案例，点击上方按钮添加</p>
        </div>
      )}
    </div>
  );
}

export default CaseStudyManagement;
