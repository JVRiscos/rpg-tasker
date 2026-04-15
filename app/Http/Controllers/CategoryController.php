<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;

/**
 * CategoryController: Gestiona el ciclo de vida completo de las categorías en la aplicación.
 * * He implementado este controlador como un 'Resource Controller' para mantener
 * una estructura CRUD estandarizada y facilitar el enrutamiento limpio.
 */
class CategoryController extends Controller
{
    /**
     * Lista todas las categorías almacenadas.
     * En el proyecto, este método se encarga de recuperar la colección de la BD
     * para enviarla a la vista principal de gestión de categorías.
     */
    public function index()
    {
        // Lógica para listar, por ejemplo: $categories = Category::all();
    }

    /**
     * Muestra el formulario de creación.
     * Retorna la vista donde el administrador podrá introducir los datos de una nueva categoría.
     */
    public function create()
    {
        // return view('admin.categories.create');
    }

    /**
     * Procesa la inserción de una nueva categoría.
     * Implemento 'StoreCategoryRequest' como Inyección de Dependencias para delegar 
     * la lógica de validación (required, unique, etc.) antes de que llegue al controlador.
     */
    public function store(StoreCategoryRequest $request)
    {
        // Lógica de guardado: Category::create($request->validated());
    }

    /**
     * Muestra los detalles de una categoría específica.
     * Utilizo 'Route Model Binding' para que Laravel inyecte automáticamente 
     * el modelo Category buscando por el ID recibido en la URL.
     */
    public function show(Category $category)
    {
        // return view('admin.categories.show', compact('category'));
    }

    /**
     * Muestra el formulario para modificar una categoría existente.
     * Se le pasa el objeto $category obtenido por el binding para precargar los campos.
     */
    public function edit(Category $category)
    {
        // return view('admin.categories.edit', compact('category'));
    }

    /**
     * Actualiza los datos de una categoría en la base de datos.
     * Se utiliza un Request personalizado (UpdateCategoryRequest) para validar
     * los cambios, asegurando la integridad de los datos.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        // Lógica de actualización: $category->update($request->validated());
    }

    /**
     * Elimina el registro de la categoría seleccionada.
     * Este método gestiona la baja física del registro en la base de datos.
     */
    public function destroy(Category $category)
    {
        // $category->delete();
    }
}