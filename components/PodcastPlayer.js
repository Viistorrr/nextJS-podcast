export default class PodcastPlayer extends React.Component {
  render() {
    const { infoPodcast, onClose } = this.props;
    console.log(infoPodcast);

    return (
      <div>
        <div className="clip">
          <picture>
            <div
              style={{
                backgroundImage: `url(${infoPodcast.urls.image ||
                  infoPodcast.channel.urls.logo_image.original})`
              }}
            />
          </picture>

          <div className="player">
            <h3>{infoPodcast.title}</h3>
            <h6>{infoPodcast.channel.title}</h6>
            <audio controls autoPlay={true}>
              <source src={infoPodcast.urls.high_mp3} type="audio/mpeg" />
            </audio>
          </div>
        </div>

        <style jsx>{`
          .clip {
            display: flex;
            height: 100%;
            flex-direction: column;
            background: #8756ca;
            color: white;
          }
          picture {
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 1 1;
            flex-direction: column;
            width: auto;
            padding: 10%;
          }
          picture div {
            width: 100%;
            height: 100%;
            background-position: 50% 50%;
            background-size: contain;
            background-repeat: no-repeat;
          }
          .player {
            padding: 30px;
            background: rgba(0, 0, 0, 0.3);
            text-align: center;
          }
          h3 {
            margin: 0;
          }
          h6 {
            margin: 0;
            margin-top: 1em;
          }
          audio {
            margin-top: 2em;
            width: 100%;
          }

          .modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 99999;
            background: black;
          }
        `}</style>

        <style jsx global>{`
          body {
            margin: 0;
            font-family: system-ui;
            background: white;
          }
        `}</style>
      </div>
    );
  }
}
