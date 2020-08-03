import "isomorphic-fetch";

import Layout from "../components/Layout";
import ChannelGrid from "../components/ChannelGrid";
export default class extends React.Component {
  static async getInitialProps() {
    //solo funciona en next
    let req = await fetch("https://api.audioboom.com/channels/recommended");
    let { body: channels } = await req.json();

    return { channels };
  }
  render() {
    const { channels } = this.props;

    return (
      <Layout title=" @viistorrr Podcasts">
        <ChannelGrid channels={channels} />
      </Layout>
    );
  }
}
