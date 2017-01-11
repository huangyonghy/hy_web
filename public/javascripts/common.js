/**
 * Created by huangyong on 1/6/17.
 */

function play(music) {
    var audio = document.getElementById("musicAudio");
    audio.setAttribute("src",  music.getAttribute("src"));
    audio.play();
}

$(document).ready(function () {
    $('#music_page_container').pagination({
        mode: 'bootstrap',
        itemsPerPage: 4,
        navigationItem: '',
        navigationContainer: '.navigationContainer',
        currentPage: '#currentPage',
        showPerPage: '#showPerPage',
        prevPage: '<li id="prev"><a href="javascript:;">&laquo;</a></li>',
        nextPage: '<li id="next"><a href="javascript:;">&raquo;</a></li>',
        showPages: false,
    });
});