import { useRouteLoaderData, useSearchParams } from "react-router-dom";
import type { DataWilayah } from "../types";

const ArrowDownIcon = () => (
  <div className="text-[#dbeafe] mb-6">
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  </div>
);

export default function FilterPage(){
    const [searchParams] = useSearchParams();
    const dataWilayah = useRouteLoaderData("root") as DataWilayah;

    const provId = searchParams.get("province");
    const regId = searchParams.get("regency");
    const distId = searchParams.get("district");

    const selectedProv = dataWilayah?.provinces.find(p => p.id.toString() === provId)?.name;
    const selectedReg = dataWilayah?.regencies.find(r => r.id.toString() === regId)?.name;
    const selectedDist = dataWilayah?.districts.find(d => d.id.toString() === distId)?.name;


    return(
        <div className="flex-1 flex flex-col h-full">
            <header className="breadcrumb h-16 border-b border-slate-100 flex items-center px-8 text-[13px] font-bold">
                <span className="text-slate-400">Indonesia</span>
                
                {selectedProv && (
                <>
                    <span className="mx-2 text-slate-300">&gt;</span>
                    <span className={selectedReg ? "text-slate-400" : "text-blue-500"}>{selectedProv}</span>
                </>
                )}
                
                {selectedReg && (
                <>
                    <span className="mx-2 text-slate-300">&gt;</span>
                    <span className={selectedDist ? "text-slate-400" : "text-blue-500"}>{selectedReg}</span>
                </>
                )}
                
                {selectedDist && (
                <>
                    <span className="mx-2 text-slate-300">&gt;</span>
                    <span className="text-blue-500">{selectedDist}</span>
                </>
                )}
            </header>

            <div className="flex-1 flex flex-col items-center justify-center p-8 overflow-y-auto">
                {!selectedProv && (
                    <p className="text-slate-400 text-lg font-medium">Silakan pilih Provinsi terlebih dahulu.</p>
                )}

                {selectedProv && (
                    <div className="text-center mb-6">
                        <p className="text-[#8bb4e7] text-[11px] font-bold tracking-widest uppercase mb-3">Provinsi</p>
                        <h2 className="text-[54px] font-extrabold text-slate-800 tracking-tight leading-none">{selectedProv}</h2>
                    </div>
                )}

                {selectedReg && (
                    <>
                        <ArrowDownIcon />
                        <div className="text-center mb-6">
                        <p className="text-[#8bb4e7] text-[11px] font-bold tracking-widest uppercase mb-3">Kota / Kabupaten</p>
                        <h2 className="text-[44px] font-extrabold text-slate-800 tracking-tight leading-none">{selectedReg}</h2>
                        </div>
                    </>
                )}

                {selectedDist && (
                    <>
                        <ArrowDownIcon />
                        <div className="text-center">
                        <p className="text-[#8bb4e7] text-[11px] font-bold tracking-widest uppercase mb-3">Kecamatan</p>
                        <h2 className="text-[36px] font-extrabold text-slate-800 tracking-tight leading-none">{selectedDist}</h2>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}