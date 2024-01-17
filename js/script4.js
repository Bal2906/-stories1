// Obtén una referencia al contenedor de historias y a las flechas
const storiesContainer = document.querySelector('.stories-container');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

// Configura la cantidad de desplazamiento en píxeles
const scrollAmount = 600;

// Variable para llevar el registro del desplazamiento
let scrollPosition = 0;

// Función para desplazar las historias
function scrollStories(direction) {
    // Obtén el ancho total y la posición actual de desplazamiento
    const containerWidth = storiesContainer.scrollWidth;
    const currentScrollPosition = storiesContainer.scrollLeft;

    // Determina la dirección y aplica el desplazamiento
    if (direction === -1) {
        storiesContainer.scrollLeft -= scrollAmount;
        scrollPosition -= scrollAmount;
    } else {
        storiesContainer.scrollLeft += scrollAmount;
        scrollPosition += scrollAmount;
    }

    // Muestra u oculta las flechas según el desplazamiento
    if (scrollPosition > 0) {
        leftArrow.style.display = 'block';
    } else {
        leftArrow.style.display = 'none';
    }

    // Si ya no hay más elementos a la derecha, oculta la flecha derecha
    if (currentScrollPosition + storiesContainer.clientWidth >= containerWidth) {
        rightArrow.style.display = 'none';
    } else {
        rightArrow.style.display = 'block';
    }
}

// Agrega eventos de clic a las flechas
leftArrow.addEventListener('click', () => scrollStories(-1));
rightArrow.addEventListener('click', () => scrollStories(1));


// Definir una función para manejar el clic en la imagen de la historia
function handleImageClick(element) {
    element.classList.add('clicked');

    setTimeout(() => {
        element.classList.remove('clicked');
        element.classList.add('loaded');

        // Después de la animación, abrir el modal
        setTimeout(() => {
            showHandleStorie(); // Llamamos a la función para abrir el modal

            // Añadir una clase 'opened' a la historia abierta
            element.classList.add('opened');
        }, 1000);
    }, 2000);
}

// Definir una función para abrir el modal con contenido dinámico
function openModal(content) {
    const modal = document.getElementById('myModalStory');
    const modalContent = document.getElementById('modalStorie');

    // Agrega el contenido al modalContent
    modalContent.innerHTML = content;

    // Muestra el modal
    modal.style.display = 'block';
    modal.classList.remove('hide');
}

// Definir una función para cerrar el modal
function closeModal() {
    const modal = document.getElementById('myModalStory');

    // Oculta el modal
    modal.classList.add('hide');
    modal.style.display = 'none';

    // Mover las historias abiertas al final de la fila
    const openedStories = document.querySelectorAll('.content-stories.opened');
    const storiesContainer = document.querySelector('.stories-container');

    openedStories.forEach(story => {
        storiesContainer.appendChild(story);
    });

    // Remover la clase 'opened' de las historias
    openedStories.forEach(story => {
        story.classList.remove('opened');
    });
}


function generateModalContent(postData, songData) {
    return `
        <div id="posts-container">
        <div class="card" id="backgroundCard" style="background-image: ${postData.coverPost ? `url('${postData.coverPost}')` : 'linear-gradient(to right, #94d2e9, #ffffff)'};">
                <div class="progress_bar_wrap">
                    <div id="progressBar" class="progress_bar"></div>
                </div>

                <div class="card_controls">
                    <div class="profile">
                        <img src="${postData.profileImage}" alt="" class="profile_img" draggable="false" />
                        <span class="yours">${postData.username}</span>
                        <span class="time">${postData.time}</span>
                    </div>

                    <div class="controls">
                        <!-- Icono de pausa -->
                        <i id="pauseIcon" aria-label="Pause" class="ph-fill ph-pause icon-pause"></i>

                        <!-- Icono de reproducción -->
                        <i id="playIcon" aria-label="Play" class="ph-fill ph-play icon-play" style="display: none;"></i>

                        <!-- Icono de silencio -->
                        <i id="speakerIcon" aria-label="Audio is playing" class="ph-fill ph-speaker-simple-x icon-speaker" style="display: none;"></i>

                        <!-- Icono de desmutear -->
                        <i id="muteIcon" aria-label="Audio is muted." class="ph-fill ph-speaker-simple-high icon-mute"></i>

                        <!-- Icono de menú -->
                        <i id="menuIcon" aria-label="Menu" class="ph-fill ph-dots-three-outline"></i>
                    </div>
                </div>

                <div class="song_wrapper">
                    <audio id="audioPlayer" src="${songData.src}" type="audio/mpeg"></audio>
                    <div class="lyrics">${songData.lyrics}</div>
                    <div class="cover">
                        <img src="${songData.cover}" alt="" />
                        <div class="col">
                            <div class="song_name">${songData.name}</div>
                            <div class="song_artist">${songData.artist}</div>
                        </div>
                    </div>
                </div>

                <div class="like-icon" onclick="toggleLike()">
                    <span id="like-count">${postData.likeCount}</span>
                    <i id="heart-icon" class="ph-fill ph-heart"></i>
                </div>
            </div>
        </div>
    `;
}

function switchDisplayMode() {
    if (displayMode === 'cover') {
        coverContainer.style.display = 'none';
        lyricsContainer.style.display = 'block';
        displayMode = 'lyrics';
    } else {
        lyricsContainer.style.display = 'none';
        coverContainer.style.display = 'flex';
        displayMode = 'cover';
        lyricsContainer.innerText = '';
    }
}

// Función para analizar las letras y devolver un array de objetos { time, lyric }
function parseLyrics(lyrics) {
    return lyrics.trim().split('\n').map(line => {
        const [time, lyric] = line.split('|');
        return { time: parseFloat(time), lyric: lyric.trim() };
    });
}


function showHandleStorie() {
    var postInfo = {
        profileImage: "../assets/profile/profile_HD.png",
        username: "B4LB3R1TH",
        time: "2h",
        coverPost: "../assets/coverStatus/4.png",
        likeCount: 0,
        // ... otros datos ...
    };

    var songInfo = {
        id: 'track1',
        name: 'Long Night pt.||',
        src: '../assets/tracks/song.mp3',
        cover: '../assets/coverMusic/song.jpg',
        artist: 'JPB',
        lyrics:
            '2.8 | We gon turn the crib into a club like\n' +
            "5.7 | Hennessy and Buddah screamin' thug life'\n" +
            " 8 | Get it baby, you know I'm the plug, right'\n" +
            " 10 | Buggin' got a feelin' that it's gonna be a long night'\n" +
            " 11 | Whoa'\n" +
            " 13 | Everything I touch turned gold'\n" +
            " 15 | Need no introduction, 'cause they know briggin more''\n" +
            " 17.3 | I hit the lotto, my motto roll up Gelato and Throttle'\n" +
            " 20 | A couple models to caudal who fuckin' brought out the bottles'\n" +
            " 22 | I'm goin' ham'\n" +
            " 23 | This ain't even luck, all planned'\n" +
            " 25 | Y'all know who the fucks I am'\n" +
            " 27 | Burnin' bucks mo bands'\n" +
            " 29 | Always been the M.O. since the start of this'\n" +
            " 30.5 | And now I'm on a mission like I'm Optimus, aye'\n" +
            "  33.5| We gon turn the crib into a club like'\n" +
            "  36 | Hennessy and Buddah screamin' thug life'\n" +
            "  39 | Get it baby, you know I'm the plug, right'\n" +
            "  40 | Buggin' got a feelin' that it's gonna be a long night'\n" +
            "  51 | Got a feelin' that it's gonna be a long night'\n" +
            "  62 | Yеah, never an averagе night'\n" +
            "  64 | Two, four hours up in a day I gotta make it right'\n" +
            "  67 | 18 of those I'm in a cave I gotta make some light'\n" +
            "  69 | Make it hype, even if we breakin' night'\n" +
            "72 | And even if things go left we gotta make 'em right'\n" +
            "74 |  Chillin' with M.I.M.E we triple up aye 'onna double UP'\n" +
            "76.4 | Triple dub, came from the basement we only goin' up'\n" +
            "79 | They lovin' us, up in the booth I'm getting dizzy,'\n" +
            "80  | but aye, the cup is up'\n" +
            "82  | Toast to my people, that's on the come up, aye'\n" +
            "84  | You lit with us, in order by the trigger buzz'\n" +
            "86  | Lookin' at my watches a spirit bomb both hands are goin' up'\n" +
            "88.5  | You comin' coast to coast with us'\n" +
            "90  | See the flows are flowin' over, flowin' yeah'\n" +
            "92  | The cup it run it over title wave up in the ocean,ah'\n" +
            "95  | We gon turn the crib into a club like'\n" +
            "97  | Hennessy and Buddah screamin' thug life'\n" +
            "100  | Get it baby, you know I'm the plug, right'\n" +
            "102  | Buggin' got a feelin' that it's gonna be a long night'\n" +
            "112  | Got a feelin' that it's gonna be a long night'\n",
    };

    var contenidoModal = generateModalContent(postInfo, songInfo);

    openModal(contenidoModal);

    // Reproducir la música
    var audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.play();

    // Obtener elementos de los íconos
    var pauseIcon = document.getElementById('pauseIcon');
    var playIcon = document.getElementById('playIcon');
    var speakerIcon = document.getElementById('speakerIcon');
    var muteIcon = document.getElementById('muteIcon');
    var heartIcon = document.getElementById('heart-icon');
    var likeCountElement = document.getElementById('like-count');

    // Cambiar la visibilidad de los íconos según el estado de reproducción
    function updateIcons() {
        if (audioPlayer.paused) {
            pauseIcon.style.display = 'none';
            playIcon.style.display = 'inline-block';
        } else {
            pauseIcon.style.display = 'inline-block';
            playIcon.style.display = 'none';
        }

        if (audioPlayer.muted) {
            speakerIcon.style.display = 'none';
            muteIcon.style.display = 'inline-block';
        } else {
            speakerIcon.style.display = 'inline-block';
            muteIcon.style.display = 'none';
        }
    }

    // Agregar evento al botón de pausa/reproducción
    pauseIcon.addEventListener('click', function () {
        audioPlayer.pause();
        updateIcons();
    });

    playIcon.addEventListener('click', function () {
        audioPlayer.play();
        updateIcons();
    });

    // Agregar evento al botón de silencio/desmutear
    speakerIcon.addEventListener('click', function () {
        audioPlayer.muted = true;
        updateIcons();
    });

    muteIcon.addEventListener('click', function () {
        audioPlayer.muted = false;
        updateIcons();
    });

    audioPlayer.addEventListener('ended', function () {
        updateIcons();
    });



    // Obtener elementos DOM necesarios para las letras
    var lyricsContainer = document.querySelector('.lyrics');

    // Asumiendo que 'songInfo' contiene la propiedad 'lyrics'
    var parsedLyrics = parseLyrics(songInfo.lyrics);

    // Mostrar las letras en el contenedor
    parsedLyrics.forEach(line => {
        var lyricElement = document.createElement('div');
        lyricElement.textContent = line.lyric;
        lyricsContainer.appendChild(lyricElement);
    });


    // Asumiendo que tienes estas variables globales o las obtienes de algún lugar
    var progressBarSize = 359; // Necesitas definir un valor adecuado para progressBarSize
    var lyricsData = parseLyrics(songInfo.lyrics); // Asegúrate de tener parseLyrics definida antes de este punto


    function updateProgressBar() {
        const width = parseInt((audioPlayer.currentTime * progressBarSize) / audioPlayer.duration);
        progressBar.style.width = width + 'px';
    }

    function updateLyrics() {
        const currentTime = audioPlayer.currentTime;
        const currentLyric = findCurrentLyric(currentTime);

        if (currentLyric) {
            lyricsContainer.innerText = currentLyric.lyric;
        }
    }

    function findCurrentLyric(currentTime) {
        for (let i = 0; i < lyricsData.length - 1; i++) {
            const currentLine = lyricsData[i];
            const nextLine = lyricsData[i + 1];

            if (currentTime >= currentLine.time && currentTime < nextLine.time) {
                return currentLine;
            }
        }

        // Manejar la última línea por separado
        const lastLine = lyricsData[lyricsData.length - 1];
        if (currentTime >= lastLine.time) {
            return lastLine;
        }

        return null;
    }

    // Dentro del bucle de reproducción (por ejemplo, dentro de un evento 'timeupdate' del reproductor de audio)
    audioPlayer.addEventListener('timeupdate', function () {
        updateProgressBar();
        updateLyrics();
    });

    var songWrapper = document.querySelector('.song_wrapper');
    var coverContainer = document.querySelector('.cover');
    var lyricsContainer = document.querySelector('.lyrics');

    // Agregar evento de clic al contenedor de la canción para cambiar entre portada y letras
    songWrapper.addEventListener('click', function () {
        coverContainer.style.display = 'none';
        lyricsContainer.style.display = 'block';
        // Puedes agregar lógica adicional aquí si es necesario
    });

    // Agregar evento de clic a las letras para volver a mostrar la portada
    lyricsContainer.addEventListener('click', function () {
        coverContainer.style.display = 'flex'; // Ajusta según sea necesario
        lyricsContainer.style.display = 'none';
        // Puedes agregar lógica adicional aquí si es necesario

        // Detener la propagación del clic para evitar que se propague al contenedor principal
        event.stopPropagation();
    });

    // Agregar evento al botón de cierre del modal
    var closeModalButton = document.querySelector('#myModalStory .closeModalStorie');
    closeModalButton.addEventListener('click', function () {
        // Pausar la música al cerrar el modal
        audioPlayer.pause();
        audioPlayer.currentTime = 0; // Reiniciar la posición de reproducción a cero
        // Cerrar el modal
        closeModal();
    });

    // Actualizar los iconos cuando cambia el estado de reproducción o silencio
    updateIcons();

    // Agregar evento para pausar la música con la barra espaciadora
    document.addEventListener('keydown', function (event) {
        if (event.code === 'Space') {
            // Pausar o reproducir la música al presionar la barra espaciadora
            if (audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }
            updateIcons();
        } else if (event.code === 'Escape') {
            // Cerrar el modal al presionar la tecla Esc
            audioPlayer.pause();
            audioPlayer.currentTime = 0; // Reiniciar la posición de reproducción a cero
            closeModal();
        }
    });
}
