import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { X, Upload, Save, Plus, Trash2, Eye, EyeOff } from 'lucide-react';

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
}

const categories = [
  { value: 'facial', label: '面部轮廓', label_en: 'Facial Contour' },
  { value: 'dental', label: '齿科', label_en: 'Dental' },
  { value: 'injection', label: '注射提升', label_en: 'Injection Lifting' },
  { value: 'body', label: '身体塑形', label_en: 'Body Sculpting' },
  { value: 'hair', label: '毛发移植', label_en: 'Hair Transplant' },
];

export default function DetailedCaseManagement() {
  const [cases, setCases] = useState<DetailedCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCase, setEditingCase] = useState<DetailedCase | null>(null);
  const [uploading, setUploading] = useState({ before: false, after: false });

  const [formData, setFormData] = useState({
    title: '',
    title_en: '',
    description: '',
    description_en: '',
    before_image_url: '',
    after_image_url: '',
    category: 'facial',
    show_in_facial: false,
    show_in_dental: false,
    show_in_injection: false,
    show_in_body: false,
    show_in_hair: false,
    display_order: 0,
    is_published: true,
  });

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('detailed_cases')
        .select('*')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCases(data || []);
    } catch (error: any) {
      console.error('Error fetching cases:', error);
      alert('加载案例失败: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File, type: 'before' | 'after'): Promise<string | null> => {
    try {
      setUploading(prev => ({ ...prev, [type]: true }));

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('未登录，请先登录管理员账号');
      }

      const { data: adminData } = await supabase
        .from('admins')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (!adminData || !adminData.is_active) {
        throw new Error('当前用户不是活跃的管理员');
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('case-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        throw new Error(`上传失败: ${uploadError.message}`);
      }

      const { data } = supabase.storage
        .from('case-images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error: any) {
      console.error('Error uploading image:', error);
      alert(`图片上传失败: ${error.message}`);
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

    const url = await uploadImage(file, type);
    if (url) {
      setFormData(prev => ({
        ...prev,
        [type === 'before' ? 'before_image_url' : 'after_image_url']: url
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.title_en || !formData.before_image_url || !formData.after_image_url) {
      alert('请填写必填字段并上传图片');
      return;
    }

    try {
      if (editingCase) {
        const { error } = await supabase
          .from('detailed_cases')
          .update(formData)
          .eq('id', editingCase.id);

        if (error) throw error;
        alert('案例更新成功！');
      } else {
        const { error } = await supabase
          .from('detailed_cases')
          .insert([formData]);

        if (error) throw error;
        alert('案例创建成功！');
      }

      resetForm();
      fetchCases();
    } catch (error: any) {
      console.error('Error saving case:', error);
      alert('保存失败: ' + error.message);
    }
  };

  const handleEdit = (caseItem: DetailedCase) => {
    setEditingCase(caseItem);
    setFormData({
      title: caseItem.title,
      title_en: caseItem.title_en,
      description: caseItem.description,
      description_en: caseItem.description_en,
      before_image_url: caseItem.before_image_url,
      after_image_url: caseItem.after_image_url,
      category: caseItem.category,
      show_in_facial: caseItem.show_in_facial,
      show_in_dental: caseItem.show_in_dental,
      show_in_injection: caseItem.show_in_injection,
      show_in_body: caseItem.show_in_body,
      show_in_hair: caseItem.show_in_hair,
      display_order: caseItem.display_order,
      is_published: caseItem.is_published,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这个案例吗？')) return;

    try {
      const { error } = await supabase
        .from('detailed_cases')
        .delete()
        .eq('id', id);

      if (error) throw error;
      alert('删除成功！');
      fetchCases();
    } catch (error: any) {
      console.error('Error deleting case:', error);
      alert('删除失败: ' + error.message);
    }
  };

  const togglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('detailed_cases')
        .update({ is_published: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      fetchCases();
    } catch (error: any) {
      console.error('Error toggling publish:', error);
      alert('操作失败: ' + error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      title_en: '',
      description: '',
      description_en: '',
      before_image_url: '',
      after_image_url: '',
      category: 'facial',
      show_in_facial: false,
      show_in_dental: false,
      show_in_injection: false,
      show_in_body: false,
      show_in_hair: false,
      display_order: 0,
      is_published: true,
    });
    setEditingCase(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="p-8 text-center">加载中...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">完整案例管理</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          新增案例
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto p-4">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                {editingCase ? '编辑案例' : '新增案例'}
              </h3>
              <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">标题 (中文) *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Title (English) *</label>
                  <input
                    type="text"
                    value={formData.title_en}
                    onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">描述 (中文)</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description (English)</label>
                  <textarea
                    value={formData.description_en}
                    onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                    rows={4}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">主分类 *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label} / {cat.label_en}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">显示顺序</label>
                  <input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">显示在以下页面:</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { key: 'show_in_facial', label: '面部轮廓' },
                    { key: 'show_in_dental', label: '齿科' },
                    { key: 'show_in_injection', label: '注射提升' },
                    { key: 'show_in_body', label: '身体塑形' },
                    { key: 'show_in_hair', label: '毛发移植' },
                  ].map(({ key, label }) => (
                    <label key={key} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData[key as keyof typeof formData] as boolean}
                        onChange={(e) => setFormData({ ...formData, [key]: e.target.checked })}
                        className="rounded"
                      />
                      <span className="text-sm">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">术前图片 *</label>
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'before')}
                      className="w-full"
                      disabled={uploading.before}
                    />
                    {uploading.before && <p className="text-sm text-blue-600">上传中...</p>}
                    {formData.before_image_url && (
                      <img
                        src={formData.before_image_url}
                        alt="术前"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">术后图片 *</label>
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'after')}
                      className="w-full"
                      disabled={uploading.after}
                    />
                    {uploading.after && <p className="text-sm text-blue-600">上传中...</p>}
                    {formData.after_image_url && (
                      <img
                        src={formData.after_image_url}
                        alt="术后"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.is_published}
                  onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                  className="rounded"
                />
                <label className="text-sm font-medium">发布</label>
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  disabled={uploading.before || uploading.after}
                >
                  <Save size={20} />
                  保存
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cases.map((caseItem) => (
          <div key={caseItem.id} className="border rounded-lg overflow-hidden shadow-sm">
            <div className="grid grid-cols-2 gap-2 p-2 bg-gray-50">
              <div>
                <p className="text-xs text-gray-500 mb-1">术前</p>
                <img
                  src={caseItem.before_image_url}
                  alt="Before"
                  className="w-full h-32 object-cover rounded"
                />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">术后</p>
                <img
                  src={caseItem.after_image_url}
                  alt="After"
                  className="w-full h-32 object-cover rounded"
                />
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{caseItem.title}</h3>
                <span className={`text-xs px-2 py-1 rounded ${caseItem.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                  {caseItem.is_published ? '已发布' : '草稿'}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-2">{caseItem.title_en}</p>

              {caseItem.description && (
                <p className="text-xs text-gray-500 mb-3 line-clamp-2">{caseItem.description}</p>
              )}

              <div className="text-xs text-gray-500 mb-3">
                <p>主分类: {categories.find(c => c.value === caseItem.category)?.label}</p>
                <p className="mt-1">显示在:
                  {[
                    caseItem.show_in_facial && '面部',
                    caseItem.show_in_dental && '齿科',
                    caseItem.show_in_injection && '注射',
                    caseItem.show_in_body && '身体',
                    caseItem.show_in_hair && '毛发',
                  ].filter(Boolean).join(', ') || '无'}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => togglePublish(caseItem.id, caseItem.is_published)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm border rounded hover:bg-gray-50"
                >
                  {caseItem.is_published ? <EyeOff size={16} /> : <Eye size={16} />}
                  {caseItem.is_published ? '隐藏' : '发布'}
                </button>
                <button
                  onClick={() => handleEdit(caseItem)}
                  className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  编辑
                </button>
                <button
                  onClick={() => handleDelete(caseItem.id)}
                  className="px-3 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {cases.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          暂无案例，点击"新增案例"开始添加
        </div>
      )}
    </div>
  );
}
