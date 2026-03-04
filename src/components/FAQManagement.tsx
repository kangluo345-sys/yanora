import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, Pencil, Trash2, Save, X } from 'lucide-react';

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

export default function FAQManagement() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    question: '',
    answer: '',
    display_order: 0,
    is_active: true,
  });

  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    try {
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setFaqs(data || []);
    } catch (error) {
      console.error('Error loading FAQs:', error);
      alert('加载FAQ失败');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setIsAdding(true);
    setFormData({
      category: '',
      question: '',
      answer: '',
      display_order: faqs.length,
      is_active: true,
    });
  };

  const handleEdit = (faq: FAQ) => {
    setEditingId(faq.id);
    setFormData({
      category: faq.category,
      question: faq.question,
      answer: faq.answer,
      display_order: faq.display_order,
      is_active: faq.is_active,
    });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({
      category: '',
      question: '',
      answer: '',
      display_order: 0,
      is_active: true,
    });
  };

  const handleSave = async () => {
    try {
      if (!formData.category || !formData.question || !formData.answer) {
        alert('请填写所有必填字段');
        return;
      }

      if (isAdding) {
        const { error } = await supabase.from('faqs').insert([formData]);
        if (error) throw error;
      } else if (editingId) {
        const { error } = await supabase
          .from('faqs')
          .update(formData)
          .eq('id', editingId);
        if (error) throw error;
      }

      await loadFAQs();
      handleCancel();
    } catch (error) {
      console.error('Error saving FAQ:', error);
      alert('保存失败');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这个FAQ吗？')) return;

    try {
      const { error } = await supabase.from('faqs').delete().eq('id', id);
      if (error) throw error;
      await loadFAQs();
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      alert('删除失败');
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('faqs')
        .update({ is_active: !currentStatus })
        .eq('id', id);
      if (error) throw error;
      await loadFAQs();
    } catch (error) {
      console.error('Error toggling FAQ status:', error);
      alert('更新状态失败');
    }
  };

  if (loading) {
    return <div className="p-8 text-center">加载中...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-light">FAQ 管理</h2>
        <button
          onClick={handleAdd}
          disabled={isAdding}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors disabled:bg-gray-400"
        >
          <Plus className="w-4 h-4" />
          添加 FAQ
        </button>
      </div>

      {(isAdding || editingId) && (
        <div className="mb-6 p-6 border border-gray-300 bg-gray-50">
          <h3 className="text-lg font-medium mb-4">
            {isAdding ? '添加新 FAQ' : '编辑 FAQ'}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">类别</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-black"
                placeholder="例如：整形手术、预约咨询"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">问题</label>
              <input
                type="text"
                value={formData.question}
                onChange={(e) =>
                  setFormData({ ...formData, question: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-black"
                placeholder="输入问题"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">答案</label>
              <textarea
                value={formData.answer}
                onChange={(e) =>
                  setFormData({ ...formData, answer: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-black h-32"
                placeholder="输入答案"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  显示顺序
                </label>
                <input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      display_order: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">状态</label>
                <label className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) =>
                      setFormData({ ...formData, is_active: e.target.checked })
                    }
                    className="w-4 h-4"
                  />
                  <span className="text-sm">激活</span>
                </label>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors"
              >
                <Save className="w-4 h-4" />
                保存
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4" />
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className={`border p-4 ${
              faq.is_active ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs px-2 py-1 bg-gray-200 text-gray-700">
                    {faq.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    顺序: {faq.display_order}
                  </span>
                  {!faq.is_active && (
                    <span className="text-xs px-2 py-1 bg-red-100 text-red-700">
                      未激活
                    </span>
                  )}
                </div>
                <h3 className="font-medium mb-2">{faq.question}</h3>
                <p className="text-sm text-gray-600">{faq.answer}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleToggleActive(faq.id, faq.is_active)}
                  className={`px-3 py-1 text-xs transition-colors ${
                    faq.is_active
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-gray-400 text-white hover:bg-gray-500'
                  }`}
                >
                  {faq.is_active ? '已激活' : '未激活'}
                </button>
                <button
                  onClick={() => handleEdit(faq)}
                  disabled={editingId !== null || isAdding}
                  className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(faq.id)}
                  disabled={editingId !== null || isAdding}
                  className="p-2 hover:bg-red-50 text-red-600 transition-colors disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {faqs.length === 0 && (
          <div className="text-center py-8 text-gray-500">暂无FAQ</div>
        )}
      </div>
    </div>
  );
}
