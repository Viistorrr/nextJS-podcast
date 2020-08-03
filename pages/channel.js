import Link from "next/link";
import Layout from "../components/Layout";
import PodcastListWithClick from "../components/PodcastListWithClick";
import PodcastPlayer from "../components/PodcastPlayer";
import Error from "./_error";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { openPodcast: null };
  }
  static async getInitialProps({ query, res }) {
    let idChannel = query.id;
    try {
      let [reqChannel, reqSeries, reqAudios] = await Promise.all([
        //Mejora el performance de la App porque hace los request en paralelo
        fetch(`https://api.audioboom.com/channels/${idChannel}`),
        fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`),
        fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`)
      ]);

      if (reqChannel.status >= 400) {
        res.statusCode = reqChannel.status;
        return {
          channel: null,
          audioClips: null,
          series: null,
          statusCode: reqChannel.status
        };
      }

      let dataChannel = await reqChannel.json();
      let channel = dataChannel.body.channel;

      let dataAudios = await reqAudios.json();
      let audioClips = dataAudios.body.audio_clips;

      let dataSeries = await reqSeries.json();
      let series = dataSeries.body.channels;

      return { channel, audioClips, series, statusCode: 200 };
    } catch (e) {
      return { channel: null, audioClips: null, series: null, statusCode: 503 };
    }
  }

  openPodcast = (event, podcast) => {
    event.preventDefault();
    this.setState({
      openPodcast: podcast
    });
  };

  closePodcast = event => {
    event.preventDefault();
    this.setState({
      closePodcast: null
    });
  };

  render() {
    const { channel, audioClips, series, statusCode } = this.props;
    const { openPodcast } = this.state;

    if (statusCode !== 200) {
      return <Error statusCode={statusCode} />;
    }

    return (
      <Layout title={channel.title}>
        <div
          className="banner"
          style={{
            backgroundImage: `url(${channel.urls.banner_image.original})`
          }}
        />
        {openPodcast && (
          <div className="modal">
            <PodcastPlayer clip={openPodcast} onClose={this.closePodcast} />
          </div>
        )}
        <h1>{channel.title}</h1>

        <h2>Ultimos Podcasts</h2>
        <PodcastListWithClick
          podcasts={audioClips}
          onClickPodcast={this.openPodcast}
        />

        <h2>Series</h2>
        {series.map(serie => (
          <div>{serie.title}</div>
        ))}

        <style jsx>{`
          header {
            color: #fff;
            background: #8756ca;
            padding: 15px;
            text-align: center;
          }
          .channels {
            display: grid;
            grid-gap: 15px;
            padding: 15px;
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          }
          a.channel {
            display: block;
            margin-bottom: 0.5em;
            color: #333;
            text-decoration: none;
          }
          .channel img {
            border-radius: 3px;
            box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
            width: 100%;
          }
          h1 {
            font-weight: 600;
            padding: 15px;
          }
          h2 {
            padding: 5px;
            font-size: 0.9em;
            font-weight: 600;
            margin: 0;
            text-align: center;
          }
        `}</style>

        <style jsx global>{`
          body {
            margin: 0;
            font-family: system-ui;
            background: white;
          }
        `}</style>
      </Layout>
    );
  }
}
