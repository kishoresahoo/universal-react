// Imports
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

// App Imports
import { actionBlogFetch, actionBlogFetchIfNeeded } from '../../../actions/blog'
import Loading from '../../common/Loading'
import Blog from './Blog'

class BlogContainer extends Component {
    constructor(props) {
        super(props)
    }

    static fetchData({ store, params }) {
        return store.dispatch(actionBlogFetch({ id: parseInt(params.id) }))
    }

    componentDidMount() {
        this.props.dispatch(actionBlogFetchIfNeeded({ id: parseInt(this.props.match.params.id) }))
    }

    refresh() {
        this.props.dispatch(actionBlogFetch({ id: parseInt(this.props.match.params.id) }))
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>Blog</title>
                </Helmet>

                { this.props.blog.loading || typeof this.props.blog.details[this.props.match.params.id] === 'undefined' ? <Loading /> : <Blog blog={ this.props.blog.details[this.props.match.params.id] } /> }

                <p><button onClick={ this.refresh.bind(this) }>Refresh</button></p>

                <p><Link to={ `/blogs` }>Back to all blogs</Link></p>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        blog: state.blog
    }
}

export default connect(mapStateToProps)(BlogContainer)