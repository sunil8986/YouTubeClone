import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const VideoDetail = () => {

    const [comments, setComments] = useState([]);

    const [videoData, setVideoData] = useState(null);
    const param = useParams();
    console.log("param:", param);
    console.log("Video ID:", param.id);
    console.log("Category ID:", param.categ);


    const [relatedVideos, setRelatedVideos] = useState([]);
    const fetchRelatedVideos = async () => {
      const url =
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&videoCategoryId=${param.categ}&maxResults=40&regionCode=IN&key=${API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();
      

      setRelatedVideos(
        data.items.filter(video => video.id !== param.id)
      );
    };

  console.log("Fetched Related Videos:", relatedVideos);

  const API_KEY = import.meta.env.VITE_API_KEY;


  const fetchComments = async () => {
  try {
    const url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${param.id}&maxResults=40&key=${API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();

      setComments(data.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
      fetchVideoData();
      fetchRelatedVideos();
      fetchComments();
  }, [param.categ, param.id]);

  const fetchVideoData = async () => {
    const url =`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${param.id}&key=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();
    console.log("Fetched Video Data:", data);
    setVideoData(data.items[0]);
  };

  return (
    <div className="flex gap-6 px-6 py-4 pt-30">
      {/* Left Side */}
      <div className="flex-[70%]">

        <iframe
          className="w-full aspect-video rounded-xl"
          src={`https://www.youtube.com/embed/${param.id}`}
          title="youtube-player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; fullscreen; volume; web-share"
        />

        {videoData && (
          <>
            <h1 className="text-xl font-bold mt-4">
              {videoData.snippet.title}
            </h1>

            <div className="flex justify-between items-center mt-4 border-b pb-4">

              <div>
                <h3 className="font-semibold">
                  {videoData.snippet.channelTitle}
                </h3>

                <p className="text-sm text-gray-500">
                  {Number(videoData.statistics.viewCount).toLocaleString()}
                  {" "}views
                </p>
              </div>

              <div className="flex gap-6 text-sm">
                <span>
                  👍 {Number(videoData.statistics.likeCount).toLocaleString()}
                </span>

                <span>
                  💬 {Number(videoData.statistics.commentCount).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="mt-4 bg-gray-100 rounded-xl p-4">
              <p className="text-sm">
                {videoData.snippet.description.slice(0, 300)}
              </p>
            </div>
          </>
        )}


       <div className="mt-8">
  <h2 className="text-lg font-semibold mb-4">
    {comments.length} Comments
  </h2>

  <div className="space-y-5">
    {comments.map((comment) => {
      const item =
        comment.snippet.topLevelComment.snippet;

      return (
        <div
          key={comment.id}
          className="flex gap-3"
        >
          <img
            src={item.authorProfileImageUrl}
            alt=""
            className="w-10 h-10 rounded-full"
          />

          <div>
            <h4 className="font-semibold text-sm">
              {item.authorDisplayName}
            </h4>

            <p className="text-sm text-gray-700 mt-1">
              {item.textDisplay}
            </p>

            <div className="flex gap-4 mt-2 text-xs text-gray-500">
              <span>
                👍 {item.likeCount}
              </span>

              <span>
                Reply
              </span>
            </div>
          </div>
        </div>
      );
    })}
  </div>
</div>   


      </div>

      {/* Right Side */}
      <div className="flex-[30%]">
        <h2 className="text-lg font-semibold mb-4">Related Videos</h2>  
          {relatedVideos.map((video) => (
            <div key={video.id} className="flex gap-4 mb-4 cursor-pointer">
              <img
                src={video.snippet.thumbnails.medium.url}
                alt=""
                className="w-40 h-24 object-cover rounded-lg"
              />
              <div>
                <h3 className="font-semibold text-sm line-clamp-2">
                  {video.snippet.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {video.snippet.channelTitle}
                </p>
                <p className="text-sm text-gray-500">
                  {Number(video.statistics.viewCount).toLocaleString()} views
                </p>
                <p className="text-sm text-gray-500">
                  {Number(video.statistics.commentCount).toLocaleString()} comments
                </p>
                <p className="text-sm text-gray-500">
                  {Number(video.statistics.likeCount).toLocaleString()} likes
                </p>

              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default VideoDetail;