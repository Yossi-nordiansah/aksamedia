import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/navbar.jsx';
import { getItems, addItem, updateItem, deleteItem } from '../db.js';
import search_icon from '../assets/search.svg';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showFormInput, setShowFormInput] = useState(false);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [nama, setNama] = useState('');
  const [jabatan, setJabatan] = useState('');
  const [alamat, setAlamat] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 5;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = parseInt(params.get('page'), 10) || 1;
    const search = params.get('search') || '';

    setCurrentPage(page);
    setSearchTerm(search);

    loadItems(search);
  }, [location.search]);

  const loadItems = async (search = '') => {
    const allItems = await getItems();
    const filtered = allItems.filter(item =>
      item.nama.toLowerCase().includes(search.toLowerCase())
    );
    setItems(allItems);
    setFilteredItems(filtered);
  };

  const updateQueryString = (page, search) => {
    const params = new URLSearchParams();
    if (page > 1) params.set('page', page);
    if (search) params.set('search', search);

    navigate({ search: params.toString() }, { replace: true });
  };

  const handleAddItem = async () => {
    if (nama && jabatan && alamat) {
      await addItem({ nama, jabatan, alamat });
      setNama('');
      setJabatan('');
      setAlamat('');
      loadItems(searchTerm);
    }
  };

  const handleUpdateItem = async (item) => {
    await updateItem(item);
    setEditingItem(null);
    loadItems(searchTerm);
  };

  const handleDeleteItem = async (id) => {
    const userConfirmed = confirm("Apakah Anda yakin akan menghapus data ?");
    if (userConfirmed) {
      await deleteItem(id);
      loadItems(searchTerm);
    } 
  };

  const handleshowFormInput = () => {
    setShowFormInput(!showFormInput);
  };

  const handleSearch = (event) => {
    const search = event.target.value.toLowerCase();
    setSearchTerm(search);
    setCurrentPage(1);
    updateQueryString(1, search);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      updateQueryString(nextPage, searchTerm);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      updateQueryString(prevPage, searchTerm);
    }
  };

  return (
    <div className="relative h-screen">
      <Navbar />
      <div className="flex mx-auto mt-5 w-60 xs:w-72 border-2 rounded-lg border-gray-500 overflow-hidden">
        <input id='search' type="text" className="w-11/12 px-2 py-1 outline-none bg-transparent" placeholder="Cari Nama..." value={searchTerm} onChange={handleSearch}/>
        <img src={search_icon} alt="search icon" className="bg-slate-400 px-2" />
      </div>
      <button onClick={handleshowFormInput} className="bg-green-400 text-white font-semibold py-1 px-2 rounded-md mx-auto block mt-4">
        Input Data
      </button>

      <table className="table-auto mx-auto w-5/6 border-collapse border border-gray-300 mt-5 xs:text-sm text-[11px]">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Nama</th>
            <th className="border border-gray-300 p-2">Jabatan</th>
            <th className="border border-gray-300 p-2">Alamat</th>
            <th className="border border-gray-300 p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id} className="text-center">
              {editingItem?.id === item.id ? (
                <>
                  <td className="border border-gray-300 p-2">
                    <input type="text" value={editingItem.nama} onChange={(e) => setEditingItem({ ...editingItem, nama: e.target.value })} className="border border-gray-300 p-1 rounded w-full" />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input type="text" value={editingItem.jabatan} onChange={(e) => setEditingItem({ ...editingItem, jabatan: e.target.value })} className="border border-gray-300 p-1 rounded w-full" />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input type="text" value={editingItem.alamat} onChange={(e) => setEditingItem({ ...editingItem, alamat: e.target.value })} className="border border-gray-300 p-1 rounded w-full" />
                  </td>
                </>
              ) : (
                <>
                  <td className="border border-gray-300 p-2">{item.nama}</td>
                  <td className="border border-gray-300 p-2">{item.jabatan}</td>
                  <td className="border border-gray-300 p-2">{item.alamat}</td>
                </>
              )}
              <td className="border border-gray-300 p-2">
                {editingItem?.id === item.id ? (
                  <button onClick={() => handleUpdateItem(editingItem)} className="bg-green-500 text-white p-1 rounded">
                    Save
                  </button>
                ) : (
                  <button onClick={() => setEditingItem(item)} className="bg-yellow-500 text-white p-1 rounded">
                    Edit
                  </button>
                )}
                <button onClick={() => handleDeleteItem(item.id)} className="bg-red-500 text-white p-1 rounded ml-2 mt-2">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center items-center mt-4">
        <button onClick={handlePrevPage} className="bg-gray-300 text-gray-700 px-3 py-1 rounded-l" disabled={currentPage === 1}>
          Kembali
        </button>
        <span className="px-4 py-2 bg-white border-t border-b border-gray-300">
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} className="bg-gray-300 text-gray-700 px-3 py-1 rounded-r" disabled={currentPage === totalPages}>
          Selanjutnya
        </button>
      </div>

      {showFormInput && (
        <form className="absolute left-1/2 -translate-y-1/2 top-1/2 -translate-x-1/2 px-5 pb-4 rounded-xl bg-gray-200">
          <h1 className="text-center font-bold text-2xl py-2">Input Data</h1>
          <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} className="border border-gray-300 py-1 px-2 rounded w-48 xs:w-72 xxs:w-52 sm:w-80 mb-2" placeholder="Nama..." />
          <br />
          <input type="text" value={jabatan} onChange={(e) => setJabatan(e.target.value)} className="border border-gray-300 py-1 px-2 rounded w-48 xs:w-72 xxs:w-52 sm:w-80 mb-2" placeholder="Jabatan..." />
          <br />
          <input type="text" value={alamat} onChange={(e) => setAlamat(e.target.value)} className="border border-gray-300 py-1 px-2 rounded w-48 xs:w-72 xxs:w-52 sm:w-80 mb-2" placeholder="Alamat..." />
          <div className="flex justify-center gap-6">
            <button onClick={handleAddItem} className="bg-blue-500 text-white py-1 px-2 rounded mt-2 block font-semibold">
              Tambah
            </button>
            <button onClick={handleshowFormInput} className="bg-red-400 text-white py-1 px-2 rounded mt-2 block font-semibold">
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Home;

