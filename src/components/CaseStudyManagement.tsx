import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Upload, Trash2, CreditCard as Edit, Save, X, Image as ImageIcon } from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  description: string;
  before_image_url: string;
  after_image_url: string;
  category: string;
  display_order: number;
  is_active: boolean;
  duration: string;
  features: string[];
  created_at: string;
}

interface FormData {
  before_image_url: string;
  after_image_url: string;
  title: string;
  description: string;
  category: string;
  display_order: number;
  is_active: boolean;
  duration: string;
  features: string;
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
    title: '',
    description: '',
    category: '面部轮廓',
    display_order: 0,
    is_active: true,
    duration: '',
    features: ''
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

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('case-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('case-images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('图片上传失败，请重试');
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

    try {
      const featuresArray = formData.features
        ? formData.features.split('\n').filter(f => f.trim())
        : [];

      const dataToSave = {
        ...formData,
        features: featuresArray
      };

      if (editingId) {
        const { error } = await supabase
          .from('case_studies')
          .update({ ...dataToSave, updated_at: new Date().toISOString() })
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
      title: caseStudy.title,
      description: caseStudy.description || '',
      category: caseStudy.category,
      display_order: caseStudy.display_order,
      is_active: caseStudy.is_active,
      duration: caseStudy.duration || '',
      features: (caseStudy.features || []).join('\n')
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

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('case_studies')
        .update({ is_active: !currentStatus, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      fetchCases();
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      before_image_url: '',
      after_image_url: '',
      title: '',
      description: '',
      category: '面部轮廓',
      display_order: 0,
      is_active: true,
      duration: '',
      features: ''
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
          <h3 className="text-xl font-light mb-6 tracking-wide" style={{color: '#1F1F1F'}}>
            {editingId ? '编辑案例' : '添加新案例'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gray-50 p-6 border" style={{borderColor: '#E5E7EB'}}>
              <h4 className="text-sm font-normal mb-4" style={{color: '#1F1F1F'}}>上传对比照片</h4>
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

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-2 font-normal" style={{color: '#4B5563'}}>
                  案例标题（选填）
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 border focus:outline-none focus:border-gray-400 transition"
                  style={{borderColor: '#D1D5DB'}}
                  placeholder="例如：面部轮廓提升案例"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 font-normal" style={{color: '#4B5563'}}>类别</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 border focus:outline-none focus:border-gray-400 transition"
                  style={{borderColor: '#D1D5DB'}}
                >
                  <option value="面部轮廓">面部轮廓</option>
                  <option value="身体塑形">身体塑形</option>
                  <option value="注射提升">注射提升</option>
                  <option value="植发">植发</option>
                  <option value="牙齿美容">牙齿美容</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2 font-normal" style={{color: '#4B5563'}}>
                案例描述（选填）
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2.5 border focus:outline-none focus:border-gray-400 transition resize-none"
                style={{borderColor: '#D1D5DB'}}
                placeholder="简要描述案例情况..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-2 font-normal" style={{color: '#4B5563'}}>
                  恢复时间（选填）
                </label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-4 py-2.5 border focus:outline-none focus:border-gray-400 transition"
                  style={{borderColor: '#D1D5DB'}}
                  placeholder="例如：7-10天"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 font-normal" style={{color: '#4B5563'}}>
                  主要改善（选填）
                </label>
                <textarea
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  className="w-full px-4 py-2.5 border focus:outline-none focus:border-gray-400 transition resize-none"
                  style={{borderColor: '#D1D5DB'}}
                  placeholder="每行一个改善点，例如：&#10;面部轮廓更立体&#10;鼻梁更挺拔"
                  rows={3}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
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

              <div className="flex items-center pt-7">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="w-5 h-5"
                  />
                  <span className="text-sm font-normal" style={{color: '#4B5563'}}>在前台展示此案例</span>
                </label>
              </div>
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
            <div className="grid grid-cols-2 gap-0">
              <div className="aspect-square overflow-hidden">
                <img
                  src={caseStudy.before_image_url}
                  alt={`${caseStudy.title} - 术前`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square overflow-hidden">
                <img
                  src={caseStudy.after_image_url}
                  alt={`${caseStudy.title} - 术后`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-sm font-normal mb-1" style={{color: '#1F1F1F'}}>
                    {caseStudy.title}
                  </h3>
                  <p className="text-xs" style={{color: '#6B7280'}}>{caseStudy.category}</p>
                </div>
                <span
                  className={`text-xs px-2 py-1 ${
                    caseStudy.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {caseStudy.is_active ? '已启用' : '已禁用'}
                </span>
              </div>


              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(caseStudy)}
                  className="flex items-center gap-1 px-3 py-1 text-xs border transition hover:bg-gray-50"
                  style={{borderColor: '#D1D5DB', color: '#6B7280'}}
                >
                  <Edit className="w-3 h-3" />
                  编辑
                </button>
                <button
                  onClick={() => toggleActive(caseStudy.id, caseStudy.is_active)}
                  className="flex items-center gap-1 px-3 py-1 text-xs border transition hover:bg-gray-50"
                  style={{borderColor: '#D1D5DB', color: '#6B7280'}}
                >
                  {caseStudy.is_active ? '禁用' : '启用'}
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
