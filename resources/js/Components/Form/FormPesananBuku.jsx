import AutocompleteInput from "../AutocompleteInput";
import InputComponent from "../InputComponent";
import { useState } from "react";

export default function FormPesanan({ data, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        id_pelanggan: data?.id_pelanggan || "",
        id_buku: data?.id_buku || "",
        judul: data?.judul || "",
        id_pelanggan: data?.id_pelanggan || "",
        nama_pelanggan: data?.nama_pelanggan || "",
        jumlah_pesanan: data?.jumlah_pesanan || "",
        tanggal_pesanan: data?.tanggal_pesanan || "",
    });

    const [errors, setErrors] = useState({
        id_buku: false,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {
            id_buku: !formData.id_buku,
        };

        setErrors(newErrors);
        if (Object.values(newErrors).some((error) => error)) {
            return;
        }

        if (onSubmit) onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 z-50 flex h-screen w-full items-center justify-center bg-zinc-900/80">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center gap-10 rounded-lg bg-white p-10 shadow-lg"
            >
                <h1 className="font-bold uppercase">
                    {data ? "Edit Pesanan" : "Tambah Pesanan"}
                </h1>
                <div className="grid w-[800px] grid-cols-2 gap-4 rounded">
                    <div className="flex flex-col gap-1">
                        <AutocompleteInput
                            label="Judul"
                            apiUrl="/api/autocomplete/buku"
                            selectedId={formData.id_buku}
                            setSelectedId={(id) => {
                                setFormData({ ...formData, id_buku: id });
                                setErrors((prev) => ({
                                    ...prev,
                                    id_buku: !id,
                                }));
                            }}
                            selectedName={formData.judul}
                            setSelectedName={(judul) =>
                                setFormData({
                                    ...formData,
                                    judul: judul,
                                })
                            }
                        />
                        {errors.id_buku && (
                            <p className="text-red-500">Buku tidak tersedia!</p>
                        )}
                    </div>

                    <InputComponent
                        id="jumlah_pesanan"
                        title="jumlah pesanan"
                        type="number"
                        value={formData.jumlah_pesanan}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex w-full flex-row justify-end gap-4">
                    <button
                        className="rounded-md bg-blue-500 px-4 py-2 uppercase text-white"
                        type="submit"
                    >
                        submit
                    </button>
                    <button
                        className="rounded-md bg-zinc-500 px-4 py-2 uppercase text-white"
                        onClick={onCancel}
                    >
                        cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
