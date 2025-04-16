import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom'; // Đã sửa thành Link từ react-router-dom
import Footer from '../components/Footer';
import Header from '../components/Header';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Dữ liệu mẫu các cửa hàng
const stores = [
  {
    id: 1,
    name: 'TechSphere Quận 1',
    address: '123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh',
    phone: '0909123456',
    hours: '9:00 - 21:00',
    lat: 10.7769,
    lng: 106.7009,
  },
  {
    id: 2,
    name: 'TechSphere Quận 7',
    address: '456 Đường Nguyễn Hữu Thọ, Quận 7, TP. Hồ Chí Minh',
    phone: '0918234567',
    hours: '9:00 - 21:00',
    lat: 10.7296,
    lng: 106.6992,
  },
  {
    id: 3,
    name: 'TechSphere Thủ Đức',
    address: '789 Đường Võ Văn Ngân, TP. Thủ Đức, TP. Hồ Chí Minh',
    phone: '0938345678',
    hours: '9:00 - 21:00',
    lat: 10.8503,
    lng: 106.7718,
  },
];

// Danh mục sản phẩm cho menu
const categories = [
  { id: 1, name: 'Điện thoại', subcategories: ['iPhone', 'Samsung', 'Xiaomi', 'OPPO'] },
  { id: 2, name: 'Laptop', subcategories: ['Macbook', 'Dell', 'HP', 'Lenovo', 'Asus'] },
  { id: 3, name: 'Máy tính bảng', subcategories: ['iPad', 'Samsung Galaxy Tab', 'Xiaomi Pad'] },
  { id: 4, name: 'Tai nghe', subcategories: ['AirPods', 'Sony', 'JBL', 'Beats'] },
  { id: 5, name: 'Đồng hồ thông minh', subcategories: ['Apple Watch', 'Samsung Galaxy Watch', 'Xiaomi Watch'] },
];

export default function StoreLocatorPage() {
  const [selectedStore, setSelectedStore] = useState(stores[0]);
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!mapInstance.current && mapRef.current) {
      mapInstance.current = L.map(mapRef.current).setView(
        [selectedStore.lat, selectedStore.lng],
        15
      );

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstance.current);

      markerRef.current = L.marker([selectedStore.lat, selectedStore.lng])
        .addTo(mapInstance.current)
        .bindPopup(`
          <b>${selectedStore.name}</b><br/>
          ${selectedStore.address}<br/>
          Điện thoại: ${selectedStore.phone}<br/>
          Giờ mở cửa: ${selectedStore.hours}
        `);
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
        markerRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (mapInstance.current && markerRef.current) {
      mapInstance.current.setView([selectedStore.lat, selectedStore.lng], 15);
      markerRef.current
        .setLatLng([selectedStore.lat, selectedStore.lng])
        .setPopupContent(`
          <b>${selectedStore.name}</b><br/>
          ${selectedStore.address}<br/>
          Điện thoại: ${selectedStore.phone}<br/>
          Giờ mở cửa: ${selectedStore.hours}
        `)
        .openPopup();
    }
  }, [selectedStore]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header categories={categories} />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm mb-6">
          <Link to="/" className="text-gray-500 hover:text-blue-600">
            Trang chủ
          </Link>
          <ChevronRight size={16} className="mx-2 text-gray-500" />
          <span className="text-gray-900 font-medium">Hệ thống cửa hàng</span>
        </div>

        <h1 className="text-2xl font-bold mb-6">Hệ thống cửa hàng ElectroShop</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Danh sách cửa hàng */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Danh sách cửa hàng</h2>
              <div className="space-y-4">
                {stores.map((store) => (
                  <div
                    key={store.id}
                    onClick={() => setSelectedStore(store)}
                    className={`p-4 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedStore.id === store.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <h3 className="font-medium text-blue-600">{store.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{store.address}</p>
                    <p className="text-sm text-gray-600">Điện thoại: {store.phone}</p>
                    <p className="text-sm text-gray-600">Giờ mở cửa: {store.hours}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bản đồ */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Vị trí trên bản đồ</h2>
              <div 
                ref={mapRef} 
                id="map" 
                style={{ height: '500px', width: '100%', borderRadius: '0.375rem', overflow: 'hidden' }} 
              />
              <p className="mt-4 text-sm text-gray-600">
                Địa chỉ: {selectedStore.address} | Điện thoại: {selectedStore.phone}
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer categories={categories} />
    </div>
  );
}