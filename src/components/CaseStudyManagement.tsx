import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Upload, Trash2, Edit, Save, X } from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  description: string;
  before_image_url: string;
  after_image_url: string;
  category: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

interface FormData {
  title: string;
  description: string;
  before_image_url: string;
  after_image_url: string;
  category: string;
  display_order: number;
  is_active: boolean;
}

function CaseStudyManagement() {
  const [cases, setCases] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    before_image_url: '',
    after_image_url: '',
    category: '面部轮廓',
    display_order: 0,
    is_active: true
  });

  useEffect(() => {
    fetchCases();
  }, []);

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
      if (editingId) {
        const { error } = await supabase
          .from('case_studies')
          .update({ ...formData, updated_at: new Date().toISOString() })
          .eq('id', editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('case_studies')
          .insert([formData]);

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
      title: caseStudy.title,
      description: caseStudy.description,
      before_image_url: caseStudy.before_image_url,
      after_image_url: caseStudy.after_image_url,
      category: caseStudy.category,
      display_order: caseStudy.display_order,
      is_active: caseStudy.is_active
    });
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
      title: '',
      description: '',
      before_image_url: '',
      after_image_url: '',
      category: '面部轮廓',
      display_order: 0,
      is_active: true
    });
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="text-center py-12">加载中...</div>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-light" style={{color: '#1F1F1F'}}>案例管理</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm transition hover:bg-gray-800"
        >
          <Upload className="w-4 h-4" />
          {showForm ? '取消' : '添加新案例'}
        </button>
      </div>

      {showForm && (
        <div className="mb-8 bg-white border p-6" style={{borderColor: '#E5E7EB'}}>
          <h3 className="text-lg font-light mb-4" style={{color: '#1F1F1F'}}>
            {editingId ? '编辑案例' : '添加新案例'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2" style={{color: '#4B5563'}}>标题</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border focus:outline-none"
                  style={{borderColor: '#D1D5DB'}}
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2" style={{color: '#4B5563'}}>类别</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border focus:outline-none"
                  style={{borderColor: '#D1D5DB'}}
                >
                  <option value="面部轮廓">面部轮廓</option>
                  <option value="身体塑形">身体塑形</option>
                  <option value="注射提升">注射提升</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2" style={{color: '#4B5563'}}>描述</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border focus:outline-none"
                style={{borderColor: '#D1D5DB'}}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2" style={{color: '#4B5563'}}>术前照片URL</label>
                <input
                  type="url"
                  value={formData.before_image_url}
                  onChange={(e) => setFormData({ ...formData, before_image_url: e.target.value })}
                  className="w-full px-3 py-2 border focus:outline-none"
                  style={{borderColor: '#D1D5DB'}}
                  placeholder="https://..."
                  required
                />
                {formData.before_image_url && (
                  <img
                    src={formData.before_image_url}
                    alt="术前预览"
                    className="mt-2 w-32 h-32 object-cover border"
                    style={{borderColor: '#D1D5DB'}}
                  />
                )}
              </div>

              <div>
                <label className="block text-sm mb-2" style={{color: '#4B5563'}}>术后照片URL</label>
                <input
                  type="url"
                  value={formData.after_image_url}
                  onChange={(e) => setFormData({ ...formData, after_image_url: e.target.value })}
                  className="w-full px-3 py-2 border focus:outline-none"
                  style={{borderColor: '#D1D5DB'}}
                  placeholder="https://..."
                  required
                />
                {formData.after_image_url && (
                  <img
                    src={formData.after_image_url}
                    alt="术后预览"
                    className="mt-2 w-32 h-32 object-cover border"
                    style={{borderColor: '#D1D5DB'}}
                  />
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2" style={{color: '#4B5563'}}>显示顺序</label>
                <input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border focus:outline-none"
                  style={{borderColor: '#D1D5DB'}}
                  min="0"
                />
              </div>

              <div className="flex items-end">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm" style={{color: '#4B5563'}}>显示在前台</span>
                </label>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm transition hover:bg-gray-800"
              >
                <Save className="w-4 h-4" />
                {editingId ? '更新' : '保存'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="flex items-center gap-2 px-4 py-2 border text-sm transition"
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

              {caseStudy.description && (
                <p className="text-xs mb-3 line-clamp-2" style={{color: '#6B7280'}}>
                  {caseStudy.description}
                </p>
              )}

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
