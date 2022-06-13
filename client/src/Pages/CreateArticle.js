import { Component } from "react";
import { Form, Button, Col, Spinner, Alert } from "react-bootstrap";
import { createProduct } from "../services/productData";
import SimpleSider from "../components/Siders/SimpleSider";
import "../components/CreateSell/CreateSell.css";
import { createArticle, getBlogs } from "../services/blogData";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import { TagsInput } from "react-tag-input-component";

class addArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      tags: [""],
      image: "",
      blogs:[],
      loading: false,
      alertShow: false,
      errors: [],
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleTagsChange = this.handleTagsChange.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }
  componentWillMount = () => {
    /* attach listeners to google StreetView */
    getBlogs()
    .then(res => {
        this.setState({ blogs: res });
    })
                .catch(err => console.log(err));

  }
  onChangeHandler(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.files) {
      this.setState({ image: e.target.files[0] });
    }
  }

  onSubmitHandler(e) {
    e.preventDefault();
    let { title, description, tags, image, blogs} = this.state;
    let obj = { title, description, tags, blogs};
    this.setState({ loading: true });
    this.getBase64(image)
      .then((data) => {
        obj["image"] = data;
        createArticle(obj)
          .then((res) => {
            if (res.error) {
              this.setState({ loading: false });
              this.setState({ errors: res.error });
              this.setState({ alertShow: true });
            } else {
                   this.props.history.push(`/blog`)
            }
          })
          .catch((err) => console.error("Creating product err: ", err));
      })
      .catch((err) => console.error("Converting to base64 err: ", err));
  }

  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  handleEditorChange(content) {
    this.setState({ description: content });
    console.log(content);
  }
  handleTagsChange(content) {
    this.setState({ tags: content });
    console.log(content);
  }
  render() {
    return (
      <>
        <SimpleSider />
        <div className="container">
          <h1 className="heading">Add an Article</h1>
          <Form onSubmit={this.onSubmitHandler}>
            {this.state.alertShow && (
              <Alert
                variant="danger"
                onClose={() => this.setState({ alertShow: false })}
                dismissible
              >
                <p>{this.state.errors}</p>
              </Alert>
            )}
            <Form.Row>
              <Form.Group as={Col} controlId="formGridTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  name="title"
                  required
                  onChange={this.onChangeHandler}
                />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridDescription.ControlTextarea1">
              <Form.Label>Description</Form.Label>
              <SunEditor
                // setContents="My contents"
                setContents=""
                showToolbar={true}
                name="Description"
                onChange={this.handleEditorChange}
                setDefaultStyle="height: auto"
                setOptions={{
                  buttonList: [
                    [
                      "bold",
                      "underline",
                      "italic",
                      "strike",
                      "list",
                      "align",
                      "fontSize",
                      "formatBlock",
                      "table",
                      "image",
                    ],
                  ],
                }}
              />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridImage">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  name="image"
                  type="file"
                  required
                  onChange={this.onChangeHandler}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridTags" >
              <Form.Label>Tags</Form.Label>
                <TagsInput
                  onChange={this.handleTagsChange}
                  name="tags"
                  placeHolder="Enter Tags"
                  id="tagsinput"
                />
                <em>press enter to add new tag</em>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridBlog">
              <Form.Label>Blogs</Form.Label>

                <Form.Control
                  as="select"
                  name="blog"
                  onChange={this.onChangeHandler}
                  required
                >
                   {this.state.blogs.map((blog) => (
                    <option
                      key={blog?._id}
                      value={blog?._id}
                      onClick={() => this.setState({ blog: blog.title })}
                    >
                      {blog.title}
                    </option>
                  ))} 
               <em>Blog *</em>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            {this.state.loading ? (
              <Button className="col-lg-12" variant="dark" disabled>
                Please wait... <Spinner animation="border" />
              </Button>
            ) : (
              <Button className="col-lg-12" variant="dark" type="submit">
                Add an Article
              </Button>
            )}
          </Form>
          <div style={{ height: "100px" }}></div>
        </div>
      </>
    );
  }
}

export default addArticle;
