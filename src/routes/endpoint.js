const { Router } = require('express');
const router = Router();
const BD = require('../config/configdb');

//READ
router.post('/getAdmin', async (req, res) => {
    
    const { usuario, contrasena } = req.body;
    
    sql = "select * from admin where usuario=:usuario";

    let result = await BD.Open(sql, [usuario], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "id_admin": user[0],
            "nombre": user[1],
            "usuario": user[2],
            "contrasena": user[3],
        }

        Users.push(userSchema);
    })

    console.log(Users);

    if(Users.usuario==="true"){
        console.log("usuario no validado");
    }else {
        if(Users.contrasena=contrasena){
            res.status(200).json(Users);
        }else{
            console.log("contraseña incorrecta");
        }
        console.log("usuario validado");
    }

});

router.get('/getAdmin', async (req, res) => {
    
    sql = "select * from admin";

    let result = await BD.Open(sql, [], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "id_admin": user[0],
            "nombre": user[1],
            "usuario": user[2],
            "contrasena": user[3],
        }

        Users.push(userSchema);
    })
    res.json(Users);
});


router.post('/Login', async (req, res) => {
    const { correo, contrasena } = req.body;

    sql = "select * from usuario where correo=:correo";

    console.log(correo);

    let result = await BD.Open(sql, [correo], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "id_usuario":user[0],
            "nombre":user[2],
            "apellido":user[3],
            "correo": user[4],
            "contrasena": user[5],
            "fecha_nacimiento": user[6],
            "pais": user[7],
            "foto": user[8],                                                          
            "token":'token'
        }
        Users.push(userSchema);
    })
    
    if(Users.nombre==="true"){
        console.log("usuario no validado");
    }else {
        if(Users.contrasena=contrasena){
            res.status(200).json(Users);
        }else{
            console.log("contraseña incorrecta");
        }
        console.log("usuario validado");
    }

});


router.get('/getUsers', async (req, res) => {

    sql = "select * from usuario ";

    let result = await BD.Open(sql, [], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "id_usuario": user[0],
            "estado": user[1],
            "nombre": user[2],
            "apellido": user[3],
            "correo": user[4],
            "contrasena": user[5],
            "fecha_nacimiento": user[6],
            "pais": user[7],
            "foto": user[8],
            "creditos":user[9]
        }
        
        Users.push(userSchema);
    })

    res.status(200).json(Users);
});

router.get('/getUser/', async (req, res) => {
    var id_usuario = req.query.id_usuario;

    sql = "select * from usuario where id_usuario=:id_usuario";

    console.log(id_usuario);

    let result = await BD.Open(sql, [id_usuario], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "estado": user[1],
            "nombre": user[2],
            "apellido": user[3],
            "correo": user[4],
            "contrasena": user[5],
            "fecha_nacimiento": user[6],
            "pais": user[7],
            "foto": user[8],
            "creditos":user[9]
        }
        
        Users.push(userSchema);
    })

    console.log(result);

    res.json(Users);
});

router.post('/addUser', async (req, res) => {
    const {nombre, apellido, correo, contrasena, fecha_nacimiento, pais, foto} = req.body;
    const estado='false';
    const creditos=10000;
    sql = "insert into usuario(estado, nombre, apellido, correo, contrasena, fecha_nacimiento, pais, foto, creditos) values (:estado, :nombre,:apellido,:correo, :contrasena, TO_DATE(:fecha_nacimiento,'yyyy-mm-dd'), :pais, :foto, :creditos)";

    await BD.Open(sql, [estado, nombre, apellido, correo, contrasena, fecha_nacimiento, pais, foto, creditos], true);

    res.status(200).json({
        "estado": estado,
        "nombre": nombre,
        "apellido": apellido,
        "correo": correo,
        "contrasena": contrasena,
        "fecha_nacimiento": fecha_nacimiento,
        "pais": pais,
        "foto": foto,
        "creditos":creditos
    })

    console.log("registro ingresado")
});

router.put("/updateUser", async (req, res) => {
    const { nombre, apellido, contrasena, fecha_nacimiento, pais, foto} = req.body;

    sql = "update usuario set nombre=:nombre, apellido=:apellido, contrasena=:contrasena, fecha_nacimiento=:fecha_nacimiento";                                                                                             

    await BD.Open(sql, [nombre, apellido, contrasena, fecha_nacimiento, pais, foto], true);

    res.status(200).json({
        "codu": codu,
        "username": username,
        "firstname": firstname,
        "lastname": lastname
    })

});                                                             



router.get('/getCategoria', async (req, res) => {
    sql = "select * from categoria";

    let result = await BD.Open(sql, [], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "id_categoria": user[0],
            "nombre": user[1],
        }

        Users.push(userSchema);
    })
    console.log(Users);
    res.status(200).json(Users);
});

router.post('/addCategoria', async (req, res) => {
    const { nombre } = req.body;

    sql = "insert into categoria(nombre) values (:nombre)";

    await BD.Open(sql, [nombre], true);

    res.status(200).json({
        "nombre": nombre
    })
});


router.post('/getProductos', async (req, res) => {
    const { nombre, descripcion, precio, palabras_clave,id_usuario, id_categoria} = req.body;

    console.log(nombre, id_usuario);

    sql = "insert into producto(nombre, descripcion, precio, palabras_clave, id_usuario, id_categoria) values (:nombre, :descripcion, :precio, :palabras_clave,:id_usuario, :id_categoria)";

    await BD.Open(sql, [nombre,  descripcion, precio, palabras_clave,id_usuario, id_categoria], true);

    res.status(200).json({
        "nombre": nombre
    })

    
});

router.get('/getProducto', async (req, res) => {
    sql = "select * from producto";

    let result = await BD.Open(sql, [], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "id_producto": user[0],
            "nombre": user[1],
            "descripcion": user[2],
            "precio": user[3],
            "id_usuario":user[5]
        }

        Users.push(userSchema);
    })

    res.status(200).json(Users);
});

router.get('/getProductos/', async (req, res) => {
    
    var id_producto=req.query.id_producto;
    
    console.log(id_producto);

    sql = "select * from producto where id_producto=:id_producto";

    let result = await BD.Open(sql, [id_producto], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "id_producto": user[0],
            "nombre": user[1],
            "descripcion": user[2],
            "precio": user[3],
            "id_usuario":user[5]
        }

        Users.push(userSchema);
    })

    res.status(200).json(Users);
});

router.get('/getProductoLike/', async (req, res) => {

    var texto = req.query.texto;

    sql = "select * from producto where nombre like %:texto";

    let result = await BD.Open(sql, [texto], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "id_producto": user[0],
            "nombre": user[1],
            "descripcion": user[2],
            "precio": user[3]
        }

        Users.push(userSchema);
    })

    res.status(200).json(Users);
});

router.get('/getCarrito/', async (req, res) => {
    var id_usuario = req.query.id_usuario;

    sql = "select carrito.id_producto, producto.nombre, producto.descripcion, producto.precio, carrito.cantidad, producto.id_usuario from producto inner join carrito on carrito.id_producto=producto.id_producto where carrito.id_usuario=:id_usuario";

    console.log(id_usuario);

    let result = await BD.Open(sql, [id_usuario], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "id_producto": user[0],
            "nombre": user[1],
            "descripcion": user[2],
            "precio": user[3],
            "cantidad": user[4],
            "id_usuario": user[5]
        }
        
        Users.push(userSchema);
    })

    console.log(result);

    res.json(Users);
});

router.post('/addCarrito', async (req, res) => {
    const { cantidad, id_usuario, id_producto} = req.body;

    console.log(cantidad, id_usuario);

    sql = "insert into carrito(cantidad, id_usuario, id_producto) values (:cantidad, :id_usuario, :id_producto)";

    await BD.Open(sql, [cantidad,id_usuario, id_producto], true);

    res.status(200).json({
        "cantidad": cantidad
    })

    
});

module.exports = router;