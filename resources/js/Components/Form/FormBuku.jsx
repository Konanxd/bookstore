import { useState } from "react";
import InputComponent from "../InputComponent";
import AutocompleteInput from "../AutocompleteInput"; // Import Autocomplete component

export default function FormBuku({ book, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        judul: book?.judul || "",
        id_penulis: book?.id_penulis || "",
        nama_penulis: book?.nama_penulis || "",
        isbn: book?.isbn || "",
        id_penerbit: book?.id_penerbit || "",
        nama_penerbit: book?.nama_penerbit || "",
        tahun_terbit: book?.tahun_terbit || "",
        id_genre: book?.id_genre || "",
        nama_genre: book?.nama_genre || "",
        harga: book?.harga || "",
        stok: book?.stok || "",
    });

    const [errors, setErrors] = useState({
        id_penulis: false,
        id_penerbit: false,
        id_genre: false,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate foreign keys
        const newErrors = {
            id_penulis: !formData.id_penulis,
            id_penerbit: !formData.id_penerbit,
            id_genre: !formData.id_genre,
        };

        setErrors(newErrors);

        // Prevent submission if any required foreign key is missing
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
                    {book ? "Edit Buku" : "Tambah Buku"}
                </h1>
                <div className="grid w-[800px] grid-cols-2 gap-4 rounded">
                    <InputComponent
                        id="judul"
                        title="Judul"
                        type="text"
                        value={formData.judul}
                        onChange={handleChange}
                    />
                    <AutocompleteInput
                        label="Penulis"
                        apiUrl="/api/autocomplete/penulis"
                        selectedId={formData.id_penulis}
                        setSelectedId={(id) => {
                            setFormData({ ...formData, id_penulis: id });
                            setErrors((prev) => ({ ...prev, id_penulis: !id }));
                        }}
                        selectedName={formData.nama_penulis}
                        setSelectedName={(nama) =>
                            setFormData({ ...formData, nama_penulis: nama })
                        }
                    />
                    {errors.id_penulis && (
                        <p className="text-red-500">Penulis harus dipilih!</p>
                    )}

                    <InputComponent
                        id="isbn"
                        title="ISBN"
                        type="text"
                        value={formData.isbn}
                        onChange={handleChange}
                    />
                    <AutocompleteInput
                        label="Penerbit"
                        apiUrl="/api/autocomplete/penerbit"
                        selectedId={formData.id_penerbit}
                        setSelectedId={(id) => {
                            setFormData({ ...formData, id_penerbit: id });
                            setErrors((prev) => ({
                                ...prev,
                                id_penerbit: !id,
                            }));
                        }}
                        selectedName={formData.nama_penerbit}
                        setSelectedName={(nama) =>
                            setFormData({ ...formData, nama_penerbit: nama })
                        }
                    />
                    {errors.id_penerbit && (
                        <p className="text-red-500">Penerbit harus dipilih!</p>
                    )}

                    <InputComponent
                        id="tahun_terbit"
                        title="Tahun Terbit"
                        type="text"
                        value={formData.tahun_terbit}
                        onChange={handleChange}
                    />
                    <AutocompleteInput
                        label="Genre"
                        apiUrl="/api/autocomplete/genre"
                        selectedId={formData.id_genre}
                        setSelectedId={(id) => {
                            setFormData({ ...formData, id_genre: id });
                            setErrors((prev) => ({ ...prev, id_genre: !id }));
                        }}
                        selectedName={formData.nama_genre}
                        setSelectedName={(nama) =>
                            setFormData({ ...formData, nama_genre: nama })
                        }
                    />
                    {errors.id_genre && (
                        <p className="text-red-500">Genre harus dipilih!</p>
                    )}

                    <InputComponent
                        id="harga"
                        title="Harga"
                        type="number"
                        value={formData.harga}
                        onChange={handleChange}
                    />
                    <InputComponent
                        id="stok"
                        title="Stok"
                        type="number"
                        value={formData.stok}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex w-full flex-row justify-end gap-4">
                    <button
                        className={`rounded-md px-4 py-2 uppercase text-white ${
                            Object.values(errors).some((error) => error)
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-500"
                        }`}
                        type="submit"
                        disabled={Object.values(errors).some((error) => error)}
                    >
                        Submit
                    </button>
                    <button
                        className="rounded-md bg-zinc-500 px-4 py-2 uppercase text-white"
                        type="button"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
