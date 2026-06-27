import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function Video({categ=0}) {

  

  const navigate = useNavigate();

  const timeAgo = (publishedAt) => {
    const publishedDate = new Date(publishedAt);
    const now = new Date();

    const seconds = Math.floor((now - publishedDate) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (const [unit, value] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / value);

      if (interval >= 1) {
        return `${interval} ${unit}${interval > 1 ? "s" : ""} ago`;
      }
    }

    return "Just now";
  };

  const API_KEY = import.meta.env.VITE_API_KEY;

  const value_converter = (value) => {
    if (value >= 1000000) {
      return Math.floor(value / 1000000) + "M";
    } else if (value >= 1000) {
      return Math.floor(value / 1000) + "K";
    }
    return value;
  };

  const video_list_url =
  `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=50&videoCategoryId=${categ}&regionCode=IN&key=${API_KEY}`;

  const [videoData, setVideoData] = useState([]);

  async function fetchVideoData() {
    try {
      const response = await fetch(video_list_url);
      const data = await response.json();
      setVideoData(data.items);
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  }

  

  useEffect(() => {
    fetchVideoData();
  }, [categ]);

  return (
    <div className="flex-1 p-6 pt-30 pl-70">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {videoData.map((video, index) => (
          <Link key={index} className="cursor-pointer"  to={`/video/${categ}/${video.id}`}>
            <img
              src={video.snippet.thumbnails.medium.url}
              alt=""
              className="w-full h-48 object-cover rounded-lg"
            />

            ID: {video.id} / Category: {categ}

            <div className="mt-3">
              <h3 className="font-semibold text-sm leading-tight line-clamp-2 text-black">
                {video.snippet.title.slice(0, 60)}{video.snippet.title.length > 50 ? "..." : ""}
              </h3>

              <p className="text-gray-600 mt-1">{video.snippet.channelTitle}</p>

              <p className="text-gray-500 text-sm">
                {value_converter(video.statistics.viewCount)} • {timeAgo(video.snippet.publishedAt)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}


