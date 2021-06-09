import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
const Home = () => {
const [articles, setArticles] = useState("");

/*setters  */
  const [title, setTitle]=useState('')
  const [userId, setUserId]= useState('')
  const [body, setBody]= useState('')
  const [searchTerm, setSearchTerm]=useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isPending, setisPending]=useState(false)
  const [showa, setShowa] = useState(false);
  const handleClosea = () => setShowa(false);
  const handleShowa = () => setShowa(true);
  



  /*delete article button */
   const handleDelete = (id) => {
    const newArticles = articles.filter(article => article.id !== id);
    setArticles(newArticles);
  }  
  

  {/*add new article to the json file with post request using fetch */}
  const handleSubmit = (e) =>{
    e.preventDefault();
    const article = {userId, title,body};
    setisPending(true);
    fetch('http://localhost:3333/articles',{
      method:  'POST',
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify(article)
    }).then(()=>{
      console.log('new blog added');
      setisPending(false);
    }
    )
  }


  /* get the data with fetch */
  useEffect(() => {
    if(articles.length) {
      return;
    }
    fetch('http://localhost:3333/articles')
      .then(res => {
        return res.json();
      })
      .then(data => {
        setArticles(data);
      })
  }, [articles])

  return (
     
  
    <div className="home">

      {/* la bare de recherche*/}
      <dive className="searchbarnput">
      <input className="searchbar" type="text" placeholder="type in order to search"
      onChange={(e) =>{setSearchTerm(e.target.value);}}/>


      {/** changer le titre */}
      <Modal
        show={showa}
        onHide={handleClosea}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form  >
        <Form.Group controlId="formBasicEmail" required value={title} onChange={(e)=> setTitle(e.target.value)}  >
        <Form.Label>New Title</Form.Label>
        <Form.Control type="text" placeholder="Enter title" />
        </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <button variant="secondary" onClick={handleClosea}>
            Close
          </button>
          <button variant="primary">Save</button>
        </Modal.Footer>
      </Modal>


        {/* ajout d'article*/}

        < button className="ajouter" variant="primary" onClick={handleShow}>
        New Post
         </button>
      </dive>
     

        <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
        <Modal.Title>New Article</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalBody">
        <Form onSubmit={handleSubmit} >
        <Form.Group controlId="formBasicEmail" required value={userId} onChange={(e)=> setUserId(e.target.value)}  >
        <Form.Label>User Id</Form.Label>
        <Form.Control type="number" placeholder="Enter ID"  />
        </Form.Group>
        <Form.Group controlId="formBasicEmail"  required value={title} onChange={(e)=> setTitle(e.target.value)}>
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Enter title" />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1" required value={body} onChange={(e)=> setBody(e.target.value)}>
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} />
        </Form.Group>
        </Form>

           </Modal.Body> 
           <Modal.Footer>
           {!isPending &&<button type="button" class="btn btn-primary"  onClick={handleClose}>
            Close
          </button>}
          {!isPending &&<button type="button" class="btn btn-primary" onClick={handleSubmit}>
            Save Changes
          </button>}
          {isPending && <button disabled> Adding Article...... </button>}
         </Modal.Footer>
         </Modal>


         {/* la liste des articles*/}
         < div className="article-list">
         {articles && articles.slice(0,16).filter((article)=>{
          if(setSearchTerm==""){return article }
          else if (article.title.toLowerCase().includes(searchTerm.toLowerCase()))
           return article}).map((article) => {
             return (
          <div className="article-preview" key={article.id} >
          <h2 className="title">{article.title.slice(0,10)}</h2>
          <p className="parag">{ article.body.slice(0,50) }</p>
          <dive className="button">
         <button className="button1" onClick={handleShowa}>Edite </button> 
           <button className="button2" onClick={() => handleDelete(article.id)}>delete </button>
          
          </dive>
          </div>)
      })}
    </div>  
    </div>
  );
}
 
export default Home;
