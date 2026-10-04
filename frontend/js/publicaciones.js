/* =========================================================
   PUBLICACIONES.JS - Filtro Estricto de Groserías
   Bloquea completamente comentarios con lenguaje inapropiado
   ========================================================= */

// 1. LISTA NEGRA COMPLETA DE PALABRAS PROHIBIDAS
const palabrasProhibidas = [

    // === GROSERÍAS COLOMBIANAS ===
    // Hijueputa y variaciones
    "hijueputa", "hijuep", "hijuegrandep", "hijuegrandisimaputa",
    "hijo de la gran puta", "hijodelagranputa", "hijodelaputa",
    "hijo de perra", "hijodeperra", "hijo de la re puta",
    "hijodelareputa", "re puta", "reputa", "re p",
    "súper puta", "superputa", "super p",
    "archi puta", "archiputa",
    
    // Gonorrea y derivados (muy colombiana)
    "gonorrea", "gonorrea", "gonorrea", "gonorrea",
    "gonorreo", "gonorrea", "gonorreico", "gonorreica",
    "gonorreicos", "gonorreicas",
    "gonorreato", "gonorreatos",
    "gonorrea", "gonorreado", "gonorreada",
    
    // Mamar y derivados
    "mamar", "mamada", "mamón", "mamona",
    "mamones", "mamonas",
    "mamagüevo", "mamaguevo", "mamevo", "mamahuevo",
    "mamahuevos", "mamahuevada",
    "mamada de gallo", "mamadegallo",
    "mamar gallo", "mamargallo",
    
    // Sapo/a (soplón)
    "sapo", "sapa", "sapos", "sapas",
    "sape", "sapes",
    "saposo", "saposa",
    "ser un sapo", "serunsapo",
    
    // Paila
    "paila", "pailas", "pailazo",
    "estar en la paila", "estarenlapaila",
    "hacer paila", "hacerpaila",
    
    // Cuadrar y derivados
    "cuadrar", "cuadra", "cuadrado",
    "cuadrada", "cuadrados",
    
    // Verga (usada en Colombia también)
    "verga", "vrg", "vr", "vrga",
    "avergado", "vergajo", "vergón", "vergon",
    "verguera", "verguero", "vergas",
    "me vale verga", "mevaleverga", "mevrg",
    "vete a la verga", "vetealaverga",
    "importa una verga", "importaunaverga",
    "no vale una verga", "novaleunaverga",
    
    // Cabrón
    "cabron", "cabrón", "cbrn",
    "cabronada", "cabronazo", "cabronazos",
    "cabrones", "cabrona", "cabronas",
    "ser un cabrón", "seruncabron",
    
    // Pendejo
    "pendejo", "pndjo", "pndj",
    "pendeja", "pendejada", "pendejadas",
    "pendejos", "pendejas", "pendejito",
    "pendeja", "pendejada",
    "ser un pendejo", "serunpendejo",
    
    // Marica (muy usada en Colombia)
    "marica", "marico", "maricona",
    "mariconazo", "maricones", "mariconas",
    "maricón", "maricota", "maricotas",
    "hacerse la marica", "hacerselamarica",
    "no sea marica", "noseamarica",
    "no seas marica", "noseasmarica",
    
    // Mierda
    "mierda", "mrd", "mrda",
    "mierdero", "mierdosa", "mierdoso",
    "me cago", "mecago", "cagada", "cagar",
    "cago", "cagando",
    "cagón", "cagon", "cagona",
    "cagada", "cagadas",
    "estar cagado", "estarcagado",
    "cagado de miedo", "cagadodemiedo",
    
    // Puta
    "puta", "puto", "pt", "ptm", "pr",
    "putita", "putero", "puter",
    "puta madre", "putamadre", "p m", "pm",
    "hijo de puta", "hijodeputa",
    "hijueputa", "hijuep",
    "puteada", "putear", "puteando",
    "putería", "puteria",
    
    // Carajo
    "carajo", "carajos", "carajo",
    "carajada", "carajadas",
    "vete al carajo", "vetealcarajo",
    "importa un carajo", "importauncarajo",
    "no vale un carajo", "novaleuncarajo",
    
    // Joder
    "joder", "jodido", "jodida",
    "jodete", "jódete", "jodan",
    "jodidamente", "jodida",
    
    // Pelado/a (insulto leve)
    "pelado", "pelada", "pelados", "peladas",
    "peladito", "peladita",
    
    // Bobo/a
    "bobo", "boba", "bobos", "bobas",
    "bobada", "bobadas", "bobito", "bobita",
    
    // Idiota/Estúpido
    "idiota", "idiot", "idiotas", "idioteces",
    "estupido", "estúpido", "estupida", "estúpida",
    "estupidez", "estupideces",
    "imbecil", "imbécil", "imbeciles",
    "imbecilidad", "imbecilidades",
    
    // Bruto
    "bruto", "bruta", "brutos", "brutas",
    "brutal", "brutada", "brutadas",
    "brutote", "brutota",
    
    // Animal
    "animal", "animales", "animalada",
    "animaladas", "animalito",
    
    // Tonto
    "tonto", "tonta", "tontos", "tontas",
    "tontera", "tonterias", "tonterías",
    "tontito", "tontita",
    
    // Loco
    "loco", "loca", "loquito", "loquita",
    "loquillo", "loquilla", "loquitos",
    "loquitas", "loquerio", "loquerío",
    
    // Demente
    "demente", "dementes", "demencia",
    "chiflado", "chiflada", "chiflados",
    "trastornado", "trastornada",
    
    // Mongólico (ofensivo)
    "mongólico", "mongolico", "mongol",
    "mongola", "mongólicos", "mongolicos",
    
    // Retrasado
    "retrasado", "retrasada", "retrasados",
    "retraso", "retrasos",
    
    // Sinvergüenza
    "sinverguenza", "sinvergüenza",
    "sinverguenzas", "sinvergüenzas",
    "sinvergonzada", "sinvergonzadas",
    
    // Desgraciado
    "desgraciado", "desgraciada",
    "desgraciados", "desgraciadas",
    "desgracia", "desgracias",
    
    // Maldito
    "maldito", "maldita", "malditos", "malditas",
    "maldicion", "maldición", "maldiciones",
    
    // Ratero/Ladrón
    "ratero", "ratera", "rata", "ratas",
    "ladron", "ladrón", "ladrona", "ladrones",
    "robar", "robo", "robos",
    "chorro", "chorra", "chorros", "chorras",
    "bandido", "bandida", "bandidos",
    
    // Perra/Perro (insulto)
    "perra", "perras", "perro", "perros",
    "perrazo", "perraza", "perritos",
    "hijo de perra", "hijodeperra",
    
    // Zorra
    "zorra", "zorras", "zorro", "zorros",
    "zorron", "zorrón", "zorrona",
    
    // Prostituta
    "prostituta", "prostituto", "prosti",
    "puta", "puto", "putero", "putera",
    "ramera", "rameras", "ramero",
    "golfa", "golfas", "golfo",
    
    // Basura
    "basura", "basuroso", "basurosa",
    "basureros", "basureras",
    
    // Inútil
    "inútil", "inutil", "inutiles", "inútiles",
    "inutilidad", "inutilidades",
    
    // Fracasado
    "fracasado", "fracasada", "fracasados",
    "fracaso", "fracasos",
    
    // Perdedor
    "perdedor", "perdedora", "perdedores",
    "loser", "losers",
    
    // Ridículo
    "ridículo", "ridiculo", "ridicula", "ridícula",
    "ridiculos", "ridiculas",
    
    // Patético
    "patético", "patetico", "patetica", "patética",
    "pateticos", "pateticas",
    
    // Lamentable
    "lamentable", "lamentables",
    
    // Vergonzoso
    "vergonzoso", "vergonzosa",
    "vergonzosos", "vergonzosas",
    
    // Asqueroso
    "asqueroso", "asquerosa",
    "asquerosos", "asquerosas",
    
    // Repugnante
    "repugnante", "repugnantes",
    
    // Horrible
    "horrible", "horribles",
    
    // Feo
    "feo", "fea", "feos", "feas",
    "horrendo", "horrenda",
    "espantoso", "espantosa",
    
    // Expresiones ofensivas colombianas
    "vete al carajo", "vetealcarajo",
    "vete al diablo", "vetealdiablo",
    "vete a la mierda", "vetealamierda",
    "vete alv", "vetealv",
    "vete a cagar", "veteacagar",
    "vete a la verga", "vetealaverga",
    "vete a la chingada", "vetealachingada",
    "lárgate", "largate", "larguese",
    "larguese", "largate de aqui",
    "fuera", "fuera de aqui", "fuera de aquí",
    "desaparece", "desaparece de aqui",
    "no sirves", "nosirves",
    "no sirves para nada", "nosirvesparanada",
    "eres una basura", "eresunabasura",
    "eres un fracaso", "eresunfracaso",
    "no vales nada", "no valesnada",
    "eres inútil", "eresinutil",
    "eres un pendejo", "eresunpendejo",
    "eres un cabrón", "eresuncabron",
    "eres una puta", "eresunaputa",
    "eres una zorra", "eresunazorra",
    "eres una perra", "eresunaperra",
    "eres un marica", "eresunmarica",
    "eres un sapo", "eresunsapo",
    "eres un gonorrea", "eresungonorrea",
    "eres un mamagüevo", "eresunmamaguevo",
    "eres un hijueputa", "eresunhijueputa",
    
    // Amenazas
    "te voy a", "te voya", "te haré", "tehare",
    "amenaza", "amenazar", "amenazas",
    "golpear", "golpe", "golpes",
    "agredir", "agresión", "agresion",
    "dañar", "daño", "dano",
    "destruir", "destrucción", "destruccion",
    "muerte", "muere", "muérete", "muert",
    "matar", "mátalo", "matalo",
    "asesino", "asesina", "asesinos",
    
    // Términos denigrantes
    "violador", "violadores", "violar",
    "abusador", "abusadores", "abusar",
    "acosador", "acosadores", "acosar",
    "pedófilo", "pedofilo", "pedofilia",
    "perverso", "perversa", "perversos",
    "depravado", "depravada",
    "sádico", "sadico", "sadica",
    "psicópata", "psicopata",
    
    // Discriminación
    "racista", "racistas", "racismo",
    "homofóbico", "homofobico", "homofobia",
    "machista", "machistas", "machismo",
    "misógino", "misogino", "misoginia",
    "sexista", "sexistas", "sexismo",
    
    // Abreviaciones colombianas
    "hp", "hdp", "hpt",
    "pndj", "pndja",
    "kbrn", "kbrona",
    "mrd", "mrda",
    "vrg", "vrga",
    "ctm", "ctmr",
    "nmms", "nmmes",
    "p m", "pm",
    
    // Leet speak colombiano
    "h1jueputa", "h1j0", "hij0",
    "pvt0", "pvto", "put0",
    "v3rga", "vrg4",
    "m13rda", "mrd4",
    "c4br0n", "c4bron",
    "p3nd3j0", "pndj0",
    "g0n0rr3a", "gnrrea",
    // === GROSERÍAS FUERTES Y VARIACIONES ===
    "hijueputa", "hijuep", "hp", "hdp", "hpt", "hijodeputa", "hijo de puta",
    "hijo de la gran puta", "hijodelagranputa", "hijuegrandep", "hijuegrandeputa",
    "puta", "puto", "pt", "ptm", "pr", "putita", "putero", "puter",
    "puta madre", "putamadre", "p m", "pm",
    
    // === VERGA Y VARIACIONES ===
    "verga", "vrg", "vr", "vrga", "avergado", "vergajo", "vergón", "vergon",
    "verguera", "verguero", "vergas",
    
    // === MIERDA Y VARIACIONES ===
    "mierda", "mrd", "mrda", "mierdero", "mierdoso", "mierdosa",
    "me cago", "mecago", "cagada", "cagar", "cago", "cagando",
    
    // === CULO Y VARIACIONES ===
    "culo", "ctm", "ctmr", "culero", "culiao", "culiada", "culiadas",
    "culos", "culear",
    
    // === MARICÓN Y TÉRMINOS HOMOFÓBICOS ===
    "maricon", "maricón", "marica", "marico", "maricona", "mariconazo",
    "maricón", "maricotas", "maricones",
    "joto", "jotos", "jota", "jotas",
    "puñal", "puñales", "punal", "punal",
    "loco", "loca", "loquita",
    "pato", "patos", "patito",
    "tortillera", "tortilleras", "tortilla",
    "sapa", "sapo", "sapos", "sapas",
    
    // === PENDEJO Y VARIACIONES ===
    "pendejo", "pndjo", "pndj", "pendeja", "pendejada", "pendejadas",
    "pendejos", "pendejas", "pendejito", "pendeja",
    
    // === CABRÓN Y VARIACIONES ===
    "cabron", "cabrón", "cbrn", "cabronada", "cabronazo", "cabrones",
    "cabrona", "cabronas",
    
    // === CARAJO Y VARIACIONES ===
    "carajo", "carajos", "carajo", "carajada",
    
    // === INSULTOS INTELECTUALES ===
    "estupido", "estúpido", "estupida", "estúpida", "estupidez",
    "idiota", "idiot", "idiotas", "idioteces",
    "imbecil", "imbécil", "imbeciles", "imbecilidad",
    "bruto", "bruta", "brutos", "brutas", "brutal", "brutada",
    "animal", "animales", "animalada",
    "tonto", "tonta", "tontos", "tontas", "tontera", "tonterias",
    "bob", "bobo", "boba", "bobos", "bobas", "bobada",
    "estupido", "estupida",
    "retrasado", "retrasada", "retrasados", "retraso",
    "mongólico", "mongolico", "mongol", "mongola",
    "down", "sindrome de down", "sindromedown",
    
    // === PROSTITUCIÓN Y TÉRMINOS SEXUALES ===
    "prostituta", "prostituto", "prosti", "puta", "puto",
    "zorra", "zorras", "zorro", "zorros",
    "ramera", "rameras", "ramero",
    "golfa", "golfas", "golfo",
    "perra", "perras", "perro", "perros",
    "perrazo", "perraza",
    "zorron", "zorrón",
    "putero", "putera",
    "ratero", "ratera", "rata", "ratas",
    "ladron", "ladrón", "ladrona", "ladrones", "robar", "robo",
    "chorro", "chorra", "chorros", "chorras",
    "bandido", "bandida", "bandidos",
    "sinverguenza", "sinvergüenza",
    "desgraciado", "desgraciada", "desgraciados",
    "maldito", "maldita", "malditos", "malditas",
    "maldicion", "maldición",
    
    // === GROSERÍAS MEXICANAS ===
    "chingada", "chingar", "chingon", "chingón", "chingada",
    "chinga", "chingas", "chingamos", "chingan",
    "me vale verga", "mevaleverga", "mevrg",
    "no mames", "nomames", "mm", "nmms",
    "pinche", "pinches", "pinchi",
    "wey", "weyes", "güey", "güeyes",
    "cabron", "cabrón",
    
    // === GROSERÍAS ARGENTINAS ===
    "boludo", "boluda", "boludos", "boludas",
    "pelotudo", "pelotuda", "pelotudos",
    "concha", "conchudo", "conchuda", "conchudos",
    "orto", "ortos", "ortivo",
    "pija", "pijas", "pijo", "pijos",
    "pito", "pitos", "pitudo",
    "garchar", "garcha",
    "coger", "cogida", "cogiendo",
    
    // === GROSERÍAS COLOMBIANAS ===
    "gonorrea", "gonorreico", "gonorrea", "gonorrea",
    "hijuep", "hijueputa", "hijuegrandep",
    "mamar", "mamada", "mamón", "mamona",
    "mamagüevo", "mamaguevo", "mamevo",
    "sape", "sapo", "sapa", "sapos", "sapas",
    "sapo", "sapa",
    "paila", "pailas",
    "quadrar", "quadra",
    
    // === GROSERÍAS PERUANAS ===
    "pata", "patas", "patudo",
    "cholo", "chola", "cholos", "cholas",
    "chamba", "chambar",
    
    // === GROSERÍAS CHILENAS ===
    "weon", "weona", "weones", "weonas",
    "hueon", "hueona", "hueones",
    "aweonao", "aweonada",
    "ctm", "ctmr", "wea",
    
    // === GROSERÍAS VENEZOLANAS ===
    "culo", "culero", "culera",
    "verga", "vergas", "verguera",
    "arrecho", "arrecha", "arrechos",
    "coño", "coños", "coñazo",
    "mamaguevo", "mamagüevo",
    
    // === TÉRMINOS DENIGRANTES Y DE ODIO ===
    "violador", "violadores", "violar", "violando",
    "abusador", "abusadores", "abusar", "abusando", "abuso",
    "acosador", "acosadores", "acosar", "acosando", "acoso",
    "pedófilo", "pedofilo", "pedofilia", "pedofilos",
    "perverso", "perversa", "perversos", "perversas",
    "depravado", "depravada", "depravados",
    "sádico", "sadico", "sadica", "sadicos",
    "psicópata", "psicopata", "psicopatas",
    "loco", "loca", "loquito", "loquita", "loquillo",
    "demente", "dementes", "demencia",
    "chiflado", "chiflada",
    "trastornado", "trastornada",
    
    // === AMENAZAS Y VIOLENCIA ===
    "muerte", "muere", "muérete", "muert", "mueran",
    "matar", "mátalo", "matalo", "maten", "matando",
    "asesino", "asesina", "asesinos", "asesinar",
    "maldito", "maldita", "malditos",
    "te voy a", "te voya", "te haré", "tehare",
    "amenaza", "amenazar", "amenazas",
    "golpear", "golpe", "golpes", "golpeando",
    "agredir", "agresión", "agresion", "agresivo",
    "dañar", "daño", "dano", "dañando",
    "destruir", "destrucción", "destruccion",
    
    // === DISCRIMINACIÓN Y ODIO ===
    "racista", "racistas", "racismo",
    "naz", "nazi", "nazis", "nazismo",
    "fascista", "fascistas", "fascismo",
    "hitler", "hitleriano",
    "kkk", "ku klux", "kuklux",
    "supremacista", "supremacistas",
    "xenófobo", "xenofobo", "xenofobia",
    "homofóbico", "homofobico", "homofobia",
    "machista", "machistas", "machismo",
    "misógino", "misogino", "misoginia",
    "sexista", "sexistas", "sexismo",
    
    // === TÉRMINOS RELIGIOSOS OFENSIVOS ===
    "dios mío", "diosmio", "dios mio",
    "jesucristo", "jesus cristo",
    "virgen", "virgen santa",
    "maldito dios", "malditodios",
    "blasfemia", "blasfemar",
    
    // === OTRAS GROSERÍAS COMUNES ===
    "joder", "jodido", "jodida", "jodete", "jódete", "jodan",
    "follar", "folla", "follando", "follada",
    "coger", "cogida", "cogiendo", "coges",
    "chingar", "chinga", "chingas", "chingamos",
    "mierda", "mierdero", "mierdosa",
    "basura", "basuroso", "basurosa",
    "inútil", "inutil", "inutiles", "inutilidad",
    "fracasado", "fracasada", "fracasados",
    "perdedor", "perdedora", "perdedores",
    "loser", "losers",
    "ridículo", "ridiculo", "ridicula", "ridiculos",
    "patético", "patetico", "patetica", "pateticos",
    "lamentable", "lamentables",
    "vergonzoso", "vergonzosa", "vergonzosos",
    "asqueroso", "asquerosa", "asquerosos",
    "repugnante", "repugnantes",
    "horrible", "horribles",
    "feo", "fea", "feos", "feas",
    "horrendo", "horrenda",
    "espantoso", "espantosa",
    
    // === ABREVIACIONES Y SLANG ===
    "xd", "xdxd", "xdd",
    "lol", "lmao", "lmfao",
    "wtf", "wtf",
    "stfu", "stfu",
    "gtfo", "gtfo",
    "kbrn", "kbrona",
    "pndj", "pndja",
    "hpt", "hpts",
    "mrd", "mrda",
    "vrg", "vrga",
    "ctm", "ctmr",
    "nmms", "nmmes",
    "p m", "pm",
    "xq", "xq",
    "tb", "tbh",
    "q", "q",
    
    // === NÚMEROS OFENSIVOS (LEET SPEAK) ===
    "h1jueputa", "h1j0", "hij0",
    "pvt0", "pvto", "put0",
    "v3rga", "vrg4",
    "m13rda", "mrd4",
    "c4br0n", "c4bron",
    "p3nd3j0", "pndj0",
    
    // === PALABRAS COMPUESTAS OFENSIVAS ===
    "come mierda", "comemierda", "comemrda",
    "traga verga", "tragaverga", "tragavrg",
    "chupa verga", "chupaverga", "chupavrg",
    "lame culo", "lameculo", "lameculo",
    "hijo de la gran puta", "hijodelagranputa",
    "hijo de puta", "hijodeputa",
    "hijo de perra", "hijodeperra",
    "hijo de la chingada", "hijodelachingada",
    "hijo de la re puta", "hijodelareputa",
    "re puta", "reputa", "re p",
    "súper puta", "superputa", "super p",
    "mega puta", "megaputa", "mega p",
    "archi puta", "archiputa",
    
    // === EXPRESIONES OFENSIVAS ===
    "vete al carajo", "vetealcarajo", "vete al diablo",
    "vete a la mierda", "vetealamierda", "vete alv",
    "vete a cagar", "veteacagar",
    "vete a la verga", "vetealaverga", "vete alv",
    "vete a freír espárragos", "veteafreiresparragos",
    "vete a la chingada", "vetealachingada",
    "vete al carajo", "vete al diablo",
    "lárgate", "largate", "larguese", "larguese",
    "fuera", "fuera de aqui", "fuera de aquí",
    "desaparece", "desaparece",
    "no sirves", "nosirves", "no sirves para nada",
    "eres una basura", "eresunabasura",
    "eres un fracaso", "eresunfracaso",
    "no vales nada", "no valesnada",
    "eres inútil", "eresinutil",
    "eres un pendejo", "eresunpendejo",
    "eres un cabrón", "eresuncabron",
    "eres una puta", "eresunaputa",
    "eres una zorra", "eresunazorra",
    "eres una perra", "eresunaperra",
    "eres un maricón", "eresunmaricon",
    "eres un joto", "eresunjoto",
    "eres un puto", "eresunputo",
    // === MALPARIDO Y VARIACIONES ===
"malparido", "malparida", "malparidos", "malparidas",
"malparido", "malparida",
"malparido hijo de puta", "malparidohijodeputa",
"malparido hijueputa", "malparidohijueputa",
"malparido pendejo", "malparidopendejo",
"malparido cabrón", "malparidocabron",
"malparido gonorrea", "malparidogonorrea",
"malparido sapo", "malparidosapo",
"malparido mamagüevo", "malparidomamaguevo",

];

// 2. FUNCIÓN PARA NORMALIZAR TEXTO
function normalizarTexto(texto) {
    let resultado = texto
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/(.)\1{2,}/g, '$1');  // ← ESTA LÍNEA ES LA CLAVE: reduce "putooo" → "puto"
    
    return resultado.trim();
}
// 3. FUNCIÓN PRINCIPAL DE DETECCIÓN
function contieneGroserias(texto) {
    const textoNormalizado = normalizarTexto(texto);
    
    for (const palabra of palabrasProhibidas) {
        const palabraNormalizada = normalizarTexto(palabra);
        
        // Crear patrón que permite letras repetidas entre cada carácter
        // Ej: "puto" → patrón "p+u+t+o+"
        // Así detecta "puto", "puuuto", "putooo", "puuutooooo", etc.
        const letras = palabraNormalizada.split('').filter(c => c !== ' ');
        const patron = letras.join('+') + '+';
        
        const regex = new RegExp('\\b' + patron + '\\b', 'gi');
        
        if (regex.test(textoNormalizado)) {
            return {
                esInvalido: true,
                palabraDetectada: palabra
            };
        }
    }
    
    return {
        esInvalido: false,
        palabraDetectada: null
    };
}
// 4. MOSTRAR TOAST DE ALERTA
function mostrarAlerta(mensaje) {
    const toastEl = document.getElementById('alertToast');
    const toastMsg = document.getElementById('toastMessage');
    
    if (toastEl && toastMsg) {
        toastMsg.textContent = mensaje;
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
    }
}

// 5. MANEJAR ENVÍO DE COMENTARIOS (BLOQUEO TOTAL)
function handleComment(event, form) {
    event.preventDefault();
    
    const input = form.querySelector('.comment-input');
    const textoOriginal = input.value.trim();

    if (!textoOriginal) return;

    // Verificar si contiene groserías
    const resultado = contieneGroserias(textoOriginal);

    if (resultado.esInvalido) {
        // BLOQUEAR el comentario completamente
        mostrarAlerta(` Tu comentario contiene lenguaje inapropiado ("${resultado.palabraDetectada}") y no puede ser publicado.`);
        
        // Limpiar el input para que el usuario lo reescriba
        input.value = '';
        input.focus();
        
        // Efecto visual de error (sacudida)
        input.style.borderColor = '#dc3545';
        input.style.animation = 'shake 0.5s ease';
        
        setTimeout(() => {
            input.style.borderColor = '';
            input.style.animation = '';
        }, 1000);
        
        return; // No publicar el comentario
    }

    // Si todo está bien, crear el comentario
    const commentsList = form.previousElementSibling;
    const nuevoComentario = document.createElement('div');
    nuevoComentario.className = 'comment-item';
    nuevoComentario.style.animation = 'slideDown 0.3s ease';
    
    nuevoComentario.innerHTML = `
        <div class="comment-avatar" style="background: var(--color-accent); color: white;">Tú</div>
        <div class="comment-body">
            <div class="comment-meta">
                <strong>Usuario (Tú)</strong>
                <span class="comment-time">Ahora mismo</span>
            </div>
            <p class="comment-text">${textoOriginal}</p>
        </div>
    `;

    commentsList.insertBefore(nuevoComentario, commentsList.firstChild);
    input.value = '';
    
    // Mensaje de éxito
    mostrarAlerta('✅ Comentario publicado exitosamente.');
}

// 6. TOGGLE DE LIKES
function toggleLike(btn) {
    btn.classList.toggle('liked');
    const icon = btn.querySelector('i');
    const countSpan = btn.querySelector('.like-count');
    let count = parseInt(countSpan.textContent);

    if (btn.classList.contains('liked')) {
        icon.classList.remove('bi-heart');
        icon.classList.add('bi-heart-fill');
        countSpan.textContent = count + 1;
    } else {
        icon.classList.remove('bi-heart-fill');
        icon.classList.add('bi-heart');
        countSpan.textContent = count - 1;
    }
}

// 7. TOGGLE DE SECCIÓN DE COMENTARIOS
function toggleComments(btn) {
    const postCard = btn.closest('.post-card');
    const commentsSection = postCard.querySelector('.comments-section');
    
    if (commentsSection.style.display === 'none') {
        commentsSection.style.display = 'block';
        setTimeout(() => {
            commentsSection.querySelector('.comment-input').focus();
        }, 100);
    } else {
        commentsSection.style.display = 'none';
    }
}

// 8. ANIMACIÓN DE SACUDIDA PARA ERROR
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

/* =========================================================
   MULTIMEDIA + INTERACCIONES
   Agregar al final del archivo publicaciones.js
   ========================================================= */

// ============================================
// MOSTRAR CONTENIDO SENSIBLE
// ============================================
function showSensitiveContent(btn) {
    const postCard = btn.closest('.post-card');
    const warning = postCard.querySelector('.content-warning');
    const content = postCard.querySelector('.sensitive-content');
    
    if (warning) warning.style.display = 'none';
    if (content) {
        content.style.display = 'block';
        // Reinicializar Swipers después de mostrar
        setTimeout(() => initSwipers(), 100);
    }
}

// ============================================
// LIGHTBOX PARA IMÁGENES
// ============================================
function openLightbox(src, caption = '') {
    const modal = document.getElementById('lightboxModal');
    const img = document.getElementById('lightboxImage');
    const cap = document.getElementById('lightboxCaption');
    
    if (modal && img) {
        img.src = src;
        if (cap) cap.textContent = caption;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const modal = document.getElementById('lightboxModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Cerrar lightbox con tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});

// Cerrar lightbox al hacer clic fuera
document.addEventListener('click', (e) => {
    const modal = document.getElementById('lightboxModal');
    if (modal && e.target === modal) {
        closeLightbox();
    }
});

// ============================================
// INICIALIZAR SWIPERS (CARRUSELES)
// ============================================
function initSwipers() {
    // Verificar que Swiper esté cargado
    if (typeof Swiper === 'undefined') {
        console.warn('Swiper.js no está cargado');
        return;
    }

    document.querySelectorAll('.media-swiper').forEach(swiperEl => {
        // Evitar inicializar dos veces el mismo swiper
        if (swiperEl.swiper) return;
        
        new Swiper(swiperEl, {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: false,
            navigation: {
                nextEl: swiperEl.querySelector('.swiper-button-next'),
                prevEl: swiperEl.querySelector('.swiper-button-prev'),
            },
            pagination: {
                el: swiperEl.querySelector('.swiper-pagination'),
                clickable: true,
            },
            keyboard: {
                enabled: true,
            },
            on: {
                slideChange: function () {
                    // Pausar videos al cambiar de slide
                    this.slides.forEach(slide => {
                        const iframe = slide.querySelector('iframe');
                        if (iframe) {
                            const src = iframe.src;
                            iframe.src = src; // Reinicia el video
                        }
                        const video = slide.querySelector('video');
                        if (video) {
                            video.pause();
                        }
                    });
                }
            }
        });
    });

    // Click en imágenes para abrir lightbox
    document.querySelectorAll('.image-slide').forEach(slide => {
        slide.addEventListener('click', () => {
            const src = slide.dataset.src;
            const alt = slide.querySelector('img')?.alt || '';
            if (src) openLightbox(src, alt);
        });
    });
}

// ============================================
// FILTROS POR CATEGORÍA
// ============================================
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const postCards = document.querySelectorAll('.post-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Actualizar botón activo
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            postCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'slideDown 0.4s ease';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// ============================================
// TOGGLE LIKES
// ============================================
function toggleLike(btn) {
    btn.classList.toggle('liked');
    const icon = btn.querySelector('i');
    const countSpan = btn.querySelector('.like-count');
    
    if (!icon || !countSpan) return;
    
    let count = parseInt(countSpan.textContent);

    if (btn.classList.contains('liked')) {
        icon.classList.remove('bi-heart');
        icon.classList.add('bi-heart-fill');
        countSpan.textContent = count + 1;
    } else {
        icon.classList.remove('bi-heart-fill');
        icon.classList.add('bi-heart');
        countSpan.textContent = count - 1;
    }
}

// ============================================
// TOGGLE COMENTARIOS
// ============================================
function toggleComments(btn) {
    const postCard = btn.closest('.post-card');
    const commentsSection = postCard.querySelector('.comments-section');
    
    if (commentsSection) {
        if (commentsSection.style.display === 'none') {
            commentsSection.style.display = 'block';
            setTimeout(() => {
                const input = commentsSection.querySelector('.comment-input');
                if (input) input.focus();
            }, 100);
        } else {
            commentsSection.style.display = 'none';
        }
    }
}

// ============================================
// MANEJAR COMENTARIOS (USANDO TU FILTRO EXISTENTE)
// ============================================
function handleComment(event, form) {
    event.preventDefault();
    
    const input = form.querySelector('.comment-input');
    const textoOriginal = input.value.trim();

    if (!textoOriginal) return;

    // Usar tu función existente de filtro de groserías
    if (typeof contieneGroserias === 'function') {
        const resultado = contieneGroserias(textoOriginal);

        if (resultado.esInvalido) {
            if (typeof mostrarAlerta === 'function') {
                mostrarAlerta(`⚠️ Tu comentario contiene lenguaje inapropiado ("${resultado.palabraDetectada}") y no puede ser publicado.`);
            } else {
                alert(`⚠️ Tu comentario contiene lenguaje inapropiado.`);
            }
            
            input.value = '';
            input.style.borderColor = '#dc3545';
            input.style.animation = 'shake 0.5s ease';
            
            setTimeout(() => {
                input.style.borderColor = '';
                input.style.animation = '';
            }, 1000);
            
            return;
        }
    }

    // Si pasa el filtro, crear el comentario
    const commentsList = form.previousElementSibling;
    if (!commentsList) return;

    const nuevoComentario = document.createElement('div');
    nuevoComentario.className = 'comment-item';
    nuevoComentario.style.animation = 'slideDown 0.3s ease';
    
    nuevoComentario.innerHTML = `
        <div class="comment-avatar" style="background: var(--color-accent); color: white;">Tú</div>
        <div class="comment-body">
            <div class="comment-meta">
                <strong>Usuario (Tú)</strong>
                <span class="comment-time">Ahora mismo</span>
            </div>
            <p class="comment-text">${textoOriginal}</p>
        </div>
    `;

    commentsList.insertBefore(nuevoComentario, commentsList.firstChild);
    input.value = '';
    
    if (typeof mostrarAlerta === 'function') {
        mostrarAlerta('✅ Comentario publicado exitosamente.');
    }
}

// ============================================
// ESTILOS DINÁMICOS PARA ANIMACIONES
// ============================================
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    @keyframes slideDown {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(dynamicStyles);

// ============================================
// INICIALIZAR TODO CUANDO CARGUE LA PÁGINA
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initFilters();
    initSwipers();
});