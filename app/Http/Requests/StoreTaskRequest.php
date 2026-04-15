<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

/**
 * StoreTaskRequest: Clase encargada de centralizar la lógica de validación
 * para la creación de nuevas tareas.
 * * He separado esta lógica del controlador siguiendo el principio de 
 * Responsabilidad Única (SRP) de SOLID.
 */
class StoreTaskRequest extends FormRequest
{
    /**
     * Determina si el usuario actual tiene permiso para realizar esta petición.
     * En este caso, simplemente comprobamos que el usuario esté autenticado.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Define las reglas de validación que se aplicarán a los datos recibidos.
     * * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // El título es obligatorio y tiene un tope de caracteres para evitar abusos en la BD.
            'title' => ['required', 'string', 'max:255'],
            
            // La descripción es opcional (nullable), pero si existe, limitamos su extensión.
            'description' => ['nullable', 'string', 'max:1000'],
            
            // Verificamos que el category_id enviado realmente exista en la tabla 'categories'.
            'category_id' => ['required', 'exists:categories,id'],
            
            // Forzamos a que la frecuencia sea uno de los tres valores permitidos en mi lógica de negocio.
            'frequency' => ['required', 'in:daily,weekly,once'],
            
            // Nos aseguramos de que el campo de completado sea estrictamente un valor booleano.
            'is_completed' => ['boolean'],
        ];
    }

    /**
     * Personalización de los mensajes de error.
     * * He configurado mensajes en español para mejorar la experiencia de usuario (UX),
     * evitando que Laravel muestre los errores por defecto en inglés.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'El título de la tarea es obligatorio.',
            'title.max' => 'El título no puede tener más de 255 caracteres.',
            'description.max' => 'La descripción no puede tener más de 1000 caracteres.',
            'category_id.required' => 'Debes seleccionar una categoría.',
            'category_id.exists' => 'La categoría seleccionada no es válida.',
            'frequency.required' => 'Debes seleccionar una frecuencia.',
            'frequency.in' => 'La frecuencia debe ser diaria, semanal o única.',
        ];
    }
}