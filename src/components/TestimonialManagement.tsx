import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Pencil, Trash2, Plus, X, Upload, Image as ImageIcon } from 'lucide-react';

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
}

export default function TestimonialManagement() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    image1_url: '',
    image2_url: '',
    image3_url: '',
    message: '',
    customer_name: '',
    display_order: 0,
    is_active: true
  });

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('display_order', { ascending: true });

    if (data) {
      setTestimonials(data);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      const { error } = await supabase
        .from('testimonials')
        .update({
          ...formData,
          updated_at: new Date().toISOString()
        })
        .eq('id', editingId);

      if (!error) {
        loadTestimonials();
        resetForm();
      }
    } else {
      const { error } = await supabase
        .from('testimonials')
        .insert([formData]);

      if (!error) {
        loadTestimonials();
        resetForm();
      }
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setFormData({
      image1_url: testimonial.image1_url,
      image2_url: testimonial.image2_url,
      image3_url: testimonial.image3_url,
      message: testimonial.message,
      customer_name: testimonial.customer_name,
      display_order: testimonial.display_order,
      is_active: testimonial.is_active
    });
    setEditingId(testimonial.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('确定要删除这条客户评价吗？')) {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (!error) {
        loadTestimonials();
      }
    }
  };

  const resetForm = () => {
    setFormData({
      image1_url: '',
      image2_url: '',
      image3_url: '',
      message: '',
      customer_name: '',
      display_order: 0,
      is_active: true
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, imageNumber: 1 | 2 | 3) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `testimonials/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    if (uploadError) {
      alert('图片上传失败');
      return;
    }

    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    setFormData(prev => ({
      ...prev,
      [`image${imageNumber}_url`]: data.publicUrl
    }));
  };

  if (loading) {
    return <div className="text-center py-8">加载中...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold" style={{ color: '#1F1F1F' }}>客户评价管理</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#1C2B3A' }}
        >
          <Plus className="w-4 h-4" />
          添加评价
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold" style={{ color: '#1F1F1F' }}>
                {editingId ? '编辑评价' : '添加新评价'}
              </h3>
              <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((num) => (
                  <div key={num}>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#4B5563' }}>
                      照片 {num}
                    </label>
                    <div className="border-2 border-dashed rounded-lg p-4 text-center" style={{ borderColor: '#D1D5DB' }}>
                      {formData[`image${num}_url` as keyof typeof formData] ? (
                        <div className="relative">
                          <img
                            src={formData[`image${num}_url` as keyof typeof formData] as string}
                            alt={`Preview ${num}`}
                            className="w-full h-32 object-cover rounded"
                          />
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, [`image${num}_url`]: '' }))}
                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <label className="cursor-pointer block">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleImageUpload(e, num as 1 | 2 | 3)}
                          />
                          <ImageIcon className="w-8 h-8 mx-auto mb-2" style={{ color: '#9CA3AF' }} />
                          <span className="text-sm" style={{ color: '#6B7280' }}>点击上传</span>
                        </label>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="或输入图片URL"
                      value={formData[`image${num}_url` as keyof typeof formData] as string}
                      onChange={(e) => setFormData(prev => ({ ...prev, [`image${num}_url`]: e.target.value }))}
                      className="mt-2 w-full px-3 py-2 border rounded text-sm"
                      style={{ borderColor: '#D1D5DB' }}
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#4B5563' }}>
                  评价内容
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border rounded"
                  style={{ borderColor: '#D1D5DB' }}
                  placeholder="输入客户评价内容..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#4B5563' }}>
                  客户姓名
                </label>
                <input
                  type="text"
                  value={formData.customer_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, customer_name: e.target.value }))}
                  required
                  className="w-full px-3 py-2 border rounded"
                  style={{ borderColor: '#D1D5DB' }}
                  placeholder="输入客户姓名..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#4B5563' }}>
                    显示顺序
                  </label>
                  <input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border rounded"
                    style={{ borderColor: '#D1D5DB' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#4B5563' }}>
                    状态
                  </label>
                  <label className="flex items-center gap-2 px-3 py-2 border rounded cursor-pointer" style={{ borderColor: '#D1D5DB' }}>
                    <input
                      type="checkbox"
                      checked={formData.is_active}
                      onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">启用显示</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border rounded hover:bg-gray-50"
                  style={{ borderColor: '#D1D5DB', color: '#4B5563' }}
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white rounded transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#1C2B3A' }}
                >
                  {editingId ? '保存修改' : '添加评价'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="border rounded-lg p-4"
            style={{ borderColor: '#E5E7EB' }}
          >
            <div className="flex gap-4">
              <div className="flex gap-2 flex-shrink-0">
                {[testimonial.image1_url, testimonial.image2_url, testimonial.image3_url].map((url, idx) => (
                  <div key={idx} className="w-20 h-24 bg-gray-100 rounded overflow-hidden">
                    {url ? (
                      <img src={url} alt={`Image ${idx + 1}`} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-6 h-6" style={{ color: '#9CA3AF' }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium" style={{ color: '#1F1F1F' }}>
                      {testimonial.customer_name}
                    </h4>
                    <span className="text-xs" style={{ color: '#9CA3AF' }}>
                      顺序: {testimonial.display_order}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        testimonial.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {testimonial.is_active ? '已启用' : '已禁用'}
                    </span>
                    <button
                      onClick={() => handleEdit(testimonial)}
                      className="p-2 hover:bg-gray-100 rounded"
                    >
                      <Pencil className="w-4 h-4" style={{ color: '#6B7280' }} />
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial.id)}
                      className="p-2 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>
                  {testimonial.message}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {testimonials.length === 0 && (
        <div className="text-center py-12 border rounded-lg" style={{ borderColor: '#E5E7EB' }}>
          <p style={{ color: '#9CA3AF' }}>暂无客户评价</p>
        </div>
      )}
    </div>
  );
}
