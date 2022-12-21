import React, { useState, useEffect, useCallback } from 'react';

import './styles.css';

import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';
import { loadPosts } from '../../utils/load-posts';

export const Home = () => {
  // Meus estados
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');
  // Lifecycle methods

  // É invocado imediatamente após um componente ser montado
  // async componentDidMount() {
  //   await this.loadPosts();
  // }

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  }

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();
    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    //Atualizando o estado dos posts
    setPosts(posts);
    setPage(nextPage);

    console.log(page, postsPerPage, nextPage, nextPage + postsPerPage);
  }

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

  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  return (
    <section className='container'>
      <div className='search-container'>
        {/* ' !! ' converte para boolean dependendo do valor no caso de uma
          string vazia vai ser false mas se for uma sring com valor ele retorna true */}
        {!!searchValue && (
          <h1>Search value: {searchValue}</h1>
        )}

        <TextInput searchValue={searchValue} handleChange={handleChange} />
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
            onClick={loadMorePosts}
            disabled={noMorePosts}
          />
        )}
      </div>
    </section>
  );
}
