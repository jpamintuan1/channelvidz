$(document).ready(function(){
    document.addEventListener('deviceready', onDeviceReady, false);
});

function onDeviceReady () {
    var channel = 'Joseph';

    getPlaylist(channel);
}

function getPlaylist(channel){

    $('#vidlist').html('');
    $.get(
        "https://www.googleapis.com/youtube/v3/channels",
        {
            part: 'contentDetails',
            forUsername: channel,
            key: 'AIzaSyAdczGh-4PyQwaN5ahtTvEuBfhrdJp6FuQ'

        },
        function (data) {
        $.each(data.items, function(i, item ) {
            console.log(item);
            playlistId =item.contentDetails.relatedPlaylists.uploads;

            getVideos(playlistID, 10);
        });
        })
        
        };



function getVideos(playlistID, maxResults) {
    $.get (
       "https://www.googleapis.com/youtube/v3/playlistItems",
       {
            part: 'snippet',
            maxResults: maxResults,
            playlistId: playlistId,
           key: 'AIzaSyAdczGh-4PyQwaN5ahtTvEuBfhrdJp6FuQ'
           }, function(data) {
            var output;
            $.each(data.items, function(i, item) {
                id = item.snippet.resourceId.videoId;
                title = item.snippet.title;
                thumb = item.snippet.thumbnails.default.url;
                $('#vidlist').append('<li videoId="'+id+'"><img src="'+thumb+'"><h3>'+title+'</h3></li>');
                $('#vidlist').listview('refresh');   
            });
           }) 

       };  


