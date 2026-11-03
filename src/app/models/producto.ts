export interface Producto {
  id: number | null;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidadStock: number;
  categoriaId: number;
  categoriaNombre: string | null;
}
