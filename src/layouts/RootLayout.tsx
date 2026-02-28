import { Outlet, useSearchParams, useLoaderData } from "react-router-dom";
import { DATA_WILAYAH } from "../data";
import type { DataWilayah } from "../types";

export const rootLoader = (): DataWilayah => {
  return DATA_WILAYAH;
};

const GlobeIcon = () => <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const DropdownIcon = () => <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400"><svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg></div>;

export default function RootLayout() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const dataWilayah = useLoaderData() as DataWilayah;

  const provId = searchParams.get("province") || "";
  const regId = searchParams.get("regency") || "";
  const distId = searchParams.get("district") || "";

  const provincesList = dataWilayah?.provinces || [];
  const regenciesList = dataWilayah?.regencies || [];
  const districtsList = dataWilayah?.districts || [];

  const availableRegencies = regenciesList.filter(r => r.province_id.toString() === provId);
  const availableDistricts = districtsList.filter(d => d.regency_id.toString() === regId);

  // Handlers
  const handleProvChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val) setSearchParams({ province: val });
    else setSearchParams({});
  };

  const handleRegChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val) setSearchParams({ province: provId, regency: val });
    else setSearchParams({ province: provId });
  };

  const handleDistChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val) setSearchParams({ province: provId, regency: regId, district: val });
    else setSearchParams({ province: provId, regency: regId });
  };

  const handleReset = () => setSearchParams({});

  return (
    <div className="flex h-screen bg-white font-sans text-slate-800 overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-72 border-r border-slate-200 bg-[#fafbfc] flex flex-col px-6 py-8 overflow-y-auto">
        <div className="flex items-center space-x-3 mb-12">
          <div className="bg-blue-50 p-1.5 rounded-full"><GlobeIcon /></div>
          <h1 className="font-bold text-lg text-slate-800">Frontend Assessment</h1>
        </div>

        <div className="flex-1">
          <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-6">Filter Wilayah</h2>
          <div className="space-y-5">
            
            {/* PROVINSI */}
            <div>
              <label className="block text-[12px] font-bold text-slate-500 mb-2">PROVINSI</label>
              <div className="relative">
                <select name="province" value={provId} onChange={handleProvChange} className="w-full appearance-none border border-slate-300 bg-white text-slate-700 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium cursor-pointer">
                  <option value="">Pilih Provinsi</option>
                  {provincesList.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>

                <DropdownIcon />
              </div>
            </div>

            {/* KOTA/KABUPATEN */}
            <div>
              <label className="block text-[12px] font-bold text-slate-500 mb-2">KOTA/KABUPATEN</label>
              <div className="relative">
                <select name="regency" value={regId} onChange={handleRegChange} disabled={!provId} className="w-full appearance-none border border-slate-300 bg-white text-slate-700 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed cursor-pointer">
                  <option value="">Pilih Kota/Kabupaten</option>
                  {availableRegencies.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                </select>

                <DropdownIcon />
              </div>
            </div>

            {/* KECAMATAN */}
            <div>
              <label className="block text-[12px] font-bold text-slate-500 mb-2">KECAMATAN</label>
              <div className="relative">
                <select name="district" value={distId} onChange={handleDistChange} disabled={!regId} className="w-full appearance-none border border-slate-300 bg-white text-slate-700 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed cursor-pointer">
                  <option value="">Pilih Kecamatan</option>
                  {availableDistricts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>

                <DropdownIcon />
              </div>
            </div>

          </div>
        </div>

        <button onClick={handleReset} className="mt-8 w-full border border-blue-500 bg-blue-50 text-blue-600 font-bold text-[13px] tracking-wider rounded-lg py-3 hover:bg-blue-100 transition">
          RESET
        </button>
      </aside>

      <main className="flex-1 flex flex-col bg-white overflow-hidden">
        <Outlet />
      </main>

    </div>
  );
}