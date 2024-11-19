async function fetchData() {
  try {
    const response = await fetch(
      "https://api.sr.se/api/v2/channels/?format=json"
    );

    // Parse the JSON response
    const data = await response.json();

    // Get the channel list container from the HTML
    const channelList = document.getElementById("channels");

    // Check if data.channels exists and is an array
    if (Array.isArray(data.channels) && data.channels.length > 0) {
      // Loop through each channel and create the HTML content
      data.channels.forEach((channel) => {
        const listItem = document.createElement("div");
        listItem.classList.add("channel-item"); // ADDED: Give listItem a class for styling

        const imgDiv = document.createElement("div");
        imgDiv.classList.add("image-container");

        // 2. Create a div for the channel's name and audio controls
        const nameAndAudioDiv = document.createElement("div"); // NEW: Container for Name and Audio
        nameAndAudioDiv.classList.add("name-audio-container"); // ADDED: Class for name and audio

        // Assign a dynamic class to each div based on channel ID
        listItem.classList.add(`channel-item-${channel.id}`); // Dynamic class based on channel ID

        // Set the background color based on the channel's color property
        if (channel.color) {
          listItem.style.backgroundColor = `#${channel.color}`; // Apply color as background
        }
        // Create a link to the channel's website
        const channelLink = document.createElement("h1");
        channelLink.textContent = channel.name; // Set the channel name

        // Create an image element for the channel's logo
        const channelImage = document.createElement("img");
        channelImage.src = channel.image; // Set the image source

        // Create a link to audio (only if liveaudio exists)
        const audioLink = document.createElement("audio");
        if (channel.liveaudio && channel.liveaudio.url) {
          audioLink.src = channel.liveaudio.url; // Set the audio URL
          audioLink.controls = true; // Add audio controls (play, pause, volume)
        } else {
          const noAudioMessage = document.createElement("p");
          noAudioMessage.textContent = "No live audio available";
          nameAndAudioDiv.appendChild(noAudioMessage); // ADD the message inside nameAndAudioDiv
        }

        // Add all elements to the list item
        imgDiv.appendChild(channelImage);
        listItem.appendChild(imgDiv);
        listItem.appendChild(channelLink);
        listItem.appendChild(audioLink);
        listItem.appendChild(nameAndAudioDiv);
        nameAndAudioDiv.appendChild(channelLink);
        nameAndAudioDiv.appendChild(audioLink);
        // Append the list item to the <ul> element
        channelList.appendChild(listItem);
      });
    } else {
      channelList.innerHTML = "<li>No channels found.</li>";
    }
  } catch (error) {
    console.error("There was an error with the fetch operation:", error);
  }
}

// Call fetchData when the page loads

window.onload = fetchData;
