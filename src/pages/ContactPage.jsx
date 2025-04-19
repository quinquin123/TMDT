import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const categories = [
  { id: 1, name: 'Điện thoại' },
  { id: 2, name: 'Laptop' },
  { id: 3, name: 'Máy tính bảng' },
  { id: 4, name: 'Tai nghe' },
  { id: 5, name: 'Đồng hồ thông minh' },
];

const ContactPage = () => {
  // State cho form liên hệ
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  // Xử lý thay đổi input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  // Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Vui lòng nhập họ tên';
    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    if (!formData.message.trim()) newErrors.message = 'Vui lòng nhập tin nhắn';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    alert('Tin nhắn đã gửi! Cảm ơn bạn đã liên hệ.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header categories={categories} />

      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-64 md:h-96" style={{ backgroundImage: 'url(/api/placeholder/1920/600)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white">Liên hệ với TechSphere</h1>
            <p className="mt-2 text-lg md:text-xl text-gray-200">Kết nối với chúng tôi để trải nghiệm công nghệ tốt nhất</p>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center text-sm">
            <Link to="/" className="text-gray-500 hover:text-blue-600">Trang chủ</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-700 font-medium">Liên hệ</span>
          </div>
        </div>
      </div>

      {/* Giới thiệu công ty */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">Về TechSphere</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <img src="/api/placeholder/600/400" alt="TechSphere Team" className="w-full h-64 md:h-96 object-cover rounded-lg shadow-md" />
            </div>
            <div className="md:w-1/2">
              <p className="text-gray-600 leading-relaxed">
                TechSphere là nhà bán lẻ công nghệ hàng đầu, cung cấp các sản phẩm điện thoại, laptop, máy tính bảng, tai nghe và đồng hồ thông minh từ các thương hiệu nổi tiếng như Apple, Samsung, Xiaomi, và hơn thế nữa. Thành lập năm 2015, sứ mệnh của chúng tôi là mang đến trải nghiệm công nghệ hiện đại, tiện lợi và đáng tin cậy cho khách hàng trên toàn quốc.
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                Với hệ thống cửa hàng rộng khắp và dịch vụ chăm sóc khách hàng tận tâm, TechSphere cam kết đồng hành cùng bạn trong hành trình khám phá công nghệ. Hãy liên hệ với chúng tôi để được hỗ trợ tốt nhất!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lịch sử hình thành */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">Hành trình phát triển</h2>
          <div className="relative">
            {/* Đường timeline dọc */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-600 h-full"></div>
            {/* Các mốc thời gian */}
            {[
              { year: '2015', title: 'Thành lập TechSphere', desc: 'TechSphere ra đời với cửa hàng đầu tiên tại TP.HCM, tập trung vào bán lẻ điện thoại.' },
              { year: '2018', title: 'Mở rộng toàn quốc', desc: 'Mở thêm 10 cửa hàng tại Hà Nội, Đà Nẵng, và các tỉnh thành khác.' },
              { year: '2020', title: 'Ra mắt website TMDT', desc: 'Triển khai nền tảng thương mại điện tử, mang đến trải nghiệm mua sắm trực tuyến.' },
              { year: '2023', title: 'Hợp tác toàn cầu', desc: 'Trở thành đối tác chính thức của Apple, Samsung, và Xiaomi tại Việt Nam.' },
              { year: '2025', title: 'Tương lai công nghệ', desc: 'Đặt mục tiêu dẫn đầu thị trường bán lẻ công nghệ Đông Nam Á.' },
            ].map((milestone, index) => (
              <div key={index} className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} justify-between`}>
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <h3 className="text-xl font-semibold text-gray-800">{milestone.year} - {milestone.title}</h3>
                  <p className="text-gray-600 mt-2">{milestone.desc}</p>
                </div>
                <div className="w-2/12 flex justify-center">
                  <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white z-10"></div>
                </div>
                <div className="w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Thông tin liên lạc */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">Liên hệ với chúng tôi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Thông tin liên hệ */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Thông tin liên hệ</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone size={20} className="text-blue-600 mr-2" />
                    <span className="text-gray-700">Hotline: 1800 1234</span>
                  </div>
                  <div className="flex items-center">
                    <Mail size={20} className="text-blue-600 mr-2" />
                    <span className="text-gray-700">Email: support@techsphere.com</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={20} className="text-blue-600 mr-2" />
                    <span className="text-gray-700">Địa chỉ: 123 Đường Công Nghệ, Quận 1, TP.HCM</span>
                  </div>
                </div>
              </div>
              {/* Bản đồ */}
              <div className="mt-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.630770335004!2d106.698089315295!3d10.762622392321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f38d03b847f%3A0x36f5577f7a7b7f7d!2sHo%20Chi%20Minh%20City!5e0!3m2!1sen!2s!4v1634567890123!5m2!1sen!2s"
                  className="w-full h-64 md:h-80 rounded-lg shadow-md"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
            {/* Form liên hệ */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Gửi tin nhắn</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 mb-1">Họ tên</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Nhập họ tên"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Nhập email"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-gray-700 mb-1">Tin nhắn</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.message ? 'border-red-500' : 'border-gray-300'
                      }`}
                      rows="5"
                      placeholder="Nhập tin nhắn của bạn"
                    ></textarea>
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <Send size={20} className="mr-2" />
                    Gửi tin nhắn
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer categories={categories} />
    </div>
  );
};

export default ContactPage;