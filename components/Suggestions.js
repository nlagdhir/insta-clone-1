import { useState, useEffect } from "react";
import minifaker, { username } from "minifaker";
import "minifaker/locales/en";

function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const suggestionData = minifaker.array(5, (i) => ({
      id: i,
      imgUrl: `https://i.pravatar.cc/150?img=${i}`,
      username: minifaker.username().toLocaleLowerCase(),
      jobTitle: minifaker.jobTitle(),
    }));

    setSuggestions(suggestionData);
    
  },[]);

  return (
    <div className="ml-10 mt-4">
      {/* Suggestion title */}
      <div className="flex justify-between items-center">
        <p className="font-bold text-sm text-gray-400">Suggestion for you</p>
        <button className="text-gray-500 font-semibold text-sm">See all</button>
      </div>

      {/* Suggestions List */}
      <div>
        {suggestions.map(suggestion => (
            <div key={suggestion.id} className="flex items-center justify-between py-1 mt-2">
                <img src={suggestion.imgUrl} alt={suggestion.username} className="h-10 rounded-full border p-[2px] mr-3" />
                <div className="flex-1">
                    <h2 className="font-bold text-sm">{suggestion.username}</h2>
                    <h3 className=" text-gray-400 text-sm truncate w-[230px]">{suggestion.jobTitle}</h3>
                </div>
                <button className="font-semibold text-blue-400 text-sm">Follow</button>
            </div>
        ))}
      </div>
    </div>
  );
}

export default Suggestions;
