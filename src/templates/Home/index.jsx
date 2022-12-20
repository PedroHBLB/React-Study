import React from 'react';

import './styles.css';

import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';
import { loadPosts } from '../../utils/load-posts';

export class Home extends React.Component {
  // Meus estados
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 2,
    searchValue: ''
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

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  }

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state

    const noMorePosts = page + postsPerPage >= allPosts.length;

    // Se o meu filteredPosts tiver valor:
    const filteredPosts = !!searchValue
      /* 
      Eu filtro os posts pelo titulo deles coloco eles em letra minuscula e incluo o valor
      que eu receber do searchValue em letra minuscula
      */
      ? allPosts.filter(posts => {
        return posts.title.toLowerCase().includes(searchValue.toLowerCase());
      })
      // Se não tiver valor retorna os posts normalmente
      : posts;

    return (
      <section className='container'>
        <div className='search-container'>
          {/* ' !! ' converte para boolean dependendo do valor no caso de uma
          string vazia vai ser false mas se for uma sring com valor ele retorna true */}
          {!!searchValue && (
            <h1>Search value: {searchValue}</h1>
          )}

          <TextInput searchValue={searchValue} handleChange={this.handleChange} />
        </div>

        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}

        {filteredPosts.length === 0 && (
          <h2>No data</h2>
        )}

        <div className='button-container'>
          {!searchValue && (
            <Button
              text="Load more posts"
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
}
