import React from 'react';

import './styles.css';

import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { loadPosts } from '../../utils/load-posts';

export class Home extends React.Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 2
  };
  // Lifecycle methods

  // É invocado imediatamente após um componente ser montado
  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    })
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts,
    } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    //Atualizando o estado dos posts
    this.setState({ posts, page: nextPage });

    console.log(page, postsPerPage, nextPage, nextPage + postsPerPage);
  }

  render() {
    const { posts, page, postsPerPage, allPosts } = this.state

    const noMorePosts = page + postsPerPage >= allPosts.length;
    return (
      <section className='container'>
        <Posts
          posts={posts}
        />
        <div className='button-container'>
          <Button
            text="Load more posts"
            onClick={this.loadMorePosts}
            disabled={noMorePosts}
          />
        </div>
      </section>
    );
  }
}
