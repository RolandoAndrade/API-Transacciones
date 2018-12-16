**Clientes**
----
  Peticiones necesarias para crear, recibir, buscar, eliminar y actualizar los datos de un cliente.

* **URL**

  >api/customers

* **Métodos aceptados:**
  
  `GET` Devuelve la lista con todos los clientes registrados.
  
  `POST` Registra un cliente.
  
  `DELETE` Elimina un cliente.
  
  `PUT` Actualiza un cliente.

  `GET` | `POST` | `DELETE` | `PUT`
  
*  **Parámetors de URL**

   >`GET` api/customers/id
   
   Obtiene al cliente con el id asociado
   
   >`GET` api/customers?queries
   
   Devulve un cliente con los parámetros establecidos:
   
   _Parámetros disponibles:_
   
   - first_name
   
   - second_name
   
   - first_surname
   
   - second_surname
   
   - email
   
   De no haber resultados que coincidan se devuelve una tupla vacía.
   
   **Requisitos:**
 
   `id=[integer]`

* **Parámetros de cuerpo**

    Al momento de hacer una petición POST el cuerpo debe ser de la forma:
    
    ```json
    {
      "first_name": "Pablo",
      "second_name": "Pedro",
      "first_surname": "Pérez",
      "second_surname": "Pal",
      "email": "pablo@example.com"
    }
    ```
    Se permiten solo peticiones con contenido de tipo:
    
    >application/json
    
    >application/x-www-form-urlencoded
    
    **Opcional** 
    
    El campo ``second_name`` es opcional.
    
* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ id : 12 }`
 
* **Error Response:**

  <_Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be._>

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Log in" }`

  OR

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Email Invalid" }`

* **Sample Call:**

  <_Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable._> 

* **Notes:**

  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._> 