import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) =>  {
    // articles = [
	// 	{
	// 		"source": {
	// 			"id": "talksport",
	// 			"name": "TalkSport"
	// 		},
	// 		"author": "Phil Spencer",
	// 		"title": "Graeme Souness completes English Channel swim to raise over £1million to help those suffering from ‘the cr...",
	// 		"description": "Graeme Souness has completed his mammoth swim across the English Channel to raise £1million for charity. The football pundit, who made his name as a Liverpool legend, took on the challenge after me…",
	// 		"url": "https://talksport.com/football/1471886/graeme-souness-english-channel-debra-uk/",
	// 		"urlToImage": "https://talksport.com/wp-content/uploads/sites/5/2023/06/Souness.png?strip=all&quality=100&w=1018&h=1024&crop=1",
	// 		"publishedAt": "2023-06-18T19:26:06Z",
	// 		"content": "Graeme Souness has completed his mammoth swim across the English Channel to raise £1million for charity.\r\nThe football pundit, who made his name as a Liverpool legend, took on the challenge after mee… [+1462 chars]"
	// 	},
	// 	{
	// 		"source": {
	// 			"id": "usa-today",
	// 			"name": "USA Today"
	// 		},
	// 		"author": null,
	// 		"title": "College football recruit charged for attempted murder the same day he announced commitment",
	// 		"description": "Santa Barbara City College running back Brandon Smith announced his commitment to the Beavers hours before an alleged attempted murder.",
	// 		"url": "https://www.usatoday.com/story/sports/ncaaf/2023/06/18/oregon-state-recruit-brandon-smith-charged-attempted-murder/70334202007/",
	// 		"urlToImage": "https://www.gannett-cdn.com/presto/2023/06/18/USAT/adfa1203-52d3-4e54-93ee-4b1cae0f0edd-USATSI_16964751.jpg?auto=webp&crop=2984,1679,x0,y108&format=pjpg&width=1200",
	// 		"publishedAt": "2023-06-18T17:30:26+00:00",
	// 		"content": "A junior college running back was arrested for an attempted murder charge the same day he announced he committed to Oregon State.\r\nOn the afternoon of June 2, Santa Barbara City College running back … [+1393 chars]"
	// 	},
	// 	{
	// 		"source": {
	// 			"id": "fox-sports",
	// 			"name": "Fox Sports"
	// 		},
	// 		"author": "RJ Young",
	// 		"title": "College football stars following in the footsteps of NFL dads",
	// 		"description": "Harrison Jr., Sanders, Gore Jr. — sound familiar? Check out the top college football stars following in the footsteps of their fathers.",
	// 		"url": "http://www.foxsports.com/stories/college-football/college-football-stars-following-in-the-footsteps-of-nfl-dads",
	// 		"urlToImage": "https://a57.foxsports.com/statics.foxsports.com/www.foxsports.com/content/uploads/2023/06/1408/814/06.09.23_Sons-of-Former-Greats-Thriving-in-CFB_Horizontal.jpg?ve=1&tl=1",
	// 		"publishedAt": "2023-06-18T15:50:38Z",
	// 		"content": "The progeny of prodigies will always get our attention. We can't help but to look at those who have the DNA of an elite-level athlete. It's like they've been given super serum, grafted their bones wi… [+5988 chars]"
	// 	},
	// 	{
	// 		"source": {
	// 			"id": "four-four-two",
	// 			"name": "FourFourTwo"
	// 		},
	// 		"author": "Ryan Dabbs",
	// 		"title": "Joey Barton says football ‘isn’t real pressure’ as he reveals the Jungian philosophy he leans on to understand and improve his players",
	// 		"description": "The Bristol Rovers manager suggests unlocking potential from players is by being authentic and tapping into what motivates them",
	// 		"url": "https://www.fourfourtwo.com/news/joey-barton-says-football-isnt-real-pressure-as-he-reveals-the-jungian-philosophy-he-leans-on-to-understand-and-improve-his-players",
	// 		"urlToImage": "https://cdn.mos.cms.futurecdn.net/ePDzysr48vm8cUvQgEQjBP-1200-80.jpg",
	// 		"publishedAt": "2023-06-15T12:29:52Z",
	// 		"content": "Joey Barton has been involved in professional football for over 20 years, firstly as a player when he made his Manchester City debut in 2002 and now as a manager at Bristol Rovers.\r\nWhile he is expec… [+1684 chars]"
	// 	},
	// 	{
	// 		"source": {
	// 			"id": "espn-cric-info",
	// 			"name": "ESPN Cric Info"
	// 		},
	// 		"author": null,
	// 		"title": "Five famous people (and one cat) you didn't know have ESPNcricinfo profiles | ESPNcricinfo.com",
	// 		"description": "Why do a footballer, a Nobel laureate and a prime minister (no, not Imran Khan) find themselves in the ESPNcricinfo player database? | ESPNcricinfo.com",
	// 		"url": "http://www.espncricinfo.com/story/_/id/29102695/five-famous-people-one-cat-know-espncricinfo-profiles",
	// 		"urlToImage": "https://a.espncdn.com/i/cricket/cricinfo/1221668_1296x1296.gif",
	// 		"publishedAt": "2020-04-27T07:20:43Z",
	// 		"content": "Why do a cat, a footballer, a Nobel laureate and a prime minister find themselves in the ESPNcricinfo database? Here are six player profiles you wouldn't have expected we had.\r\nPeter the catThe only … [+5504 chars]"
	// 	}
	// ]

	// static defaultProps = {
	// 	country: 'in',
	// 	pageSize: 12,
	// 	category: 'general'
	// }

	// static propTypes = {
	// 	country: PropTypes.string,
	// 	pageSize: PropTypes.number,
	// 	category: PropTypes.string
	// }
	const [articles,setArticles] = useState([])
	const [loading,setLoading] = useState(true)
	const [page,setPage] = useState(1)
	const [totalResults,setTotalResults] = useState(0)
	// document.title = `${this.capitalizeFirstLetter(props.category)} - NewsMonkey`;

	const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}


	const updateNews = async () =>{
		props.setProgress(10);
		const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&language=en&apiKey=${props.apiKey}&category=${props.category}&page=${page}&pageSize=${props.pageSize}`;

		setLoading(true)
		let data = await fetch(url);
		props.setProgress(30);
		let parsedData = await data.json();
		props.setProgress(70);
		setArticles(parsedData.articles);
		setTotalResults(parsedData.totalResults);
		setLoading(false);
		//console.log(parsedData);
		
		props.setProgress(100);
	}

	useEffect(() => {
		updateNews();
	}, [])
	
	
	const handleNextClick = async () => {
		//console.log("Next");
		// if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize) )){
		// 	let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&category=${props.category}&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
		// 	this.setState({loading: true})
		// 	let data = await fetch(url);
		// 	let parsedData = await data.json();
		// 	//console.log(parsedData);
		// 	this.setState({
		// 		page: this.state.page + 1,
		// 		articles : parsedData.articles,
		// 		loading: false
		// 	}) 
		// }
		setPage(page+1);
		updateNews();
	}

	const handlePrevClick = async () => {
		//console.log("Prev");
		// let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&category=${props.category}&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
		// this.setState({loading: true})
		// let data = await fetch(url);
		// let parsedData = await data.json();
		// //console.log(parsedData);
		// this.setState({
		// 	page: this.state.page - 1,
		// 	articles : parsedData.articles,
		// 	loading: false
		// })
		
		setPage(page -1 );
		updateNews();
	}


	const fetchMoreData = async () => {

		setPage(page + 1)
		const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&language=en&apiKey=${props.apiKey}&category=${props.category}&page=${page}&pageSize=${props.pageSize}`;
		//this.setState({loading: true})
		let data = await fetch(url);
		let parsedData = await data.json();
		
		//console.log(parsedData);
		setArticles(articles.concat(parsedData.articles))
		setTotalResults(parsedData.totalResults)
		
	  };
	//console.log("render")
    return (
		<>
      
		<h1 className="text-center" style={{margin: '35px 0px'}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner/>}
		<InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
			<div className="container">
        <div className="row">
		 {/* {!this.state.loading && this.state.articles.map((element) => {
			return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title } description={element.description } imageUrl= {element.urlToImage} newsUrl = {element.url}
				author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
			 })} */}
		{articles.map((element) => {
			return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title } description={element.description } imageUrl= {element.urlToImage} newsUrl = {element.url}
				author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
			 })}            
        </div>
		</div>
		</InfiniteScroll>
		{/* <div className="container d-flex justify-content-between">
			
			<button disabled={this.state.page<=1} type="button" className="btn btn-danger" onClick={this.handlePrevClick} > &larr; Previous</button>
			<button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-danger" onClick={this.handleNextClick} >Next &rarr;</button>
		</div> */}
      
	  </>
    )
}

	News.defaultProps = {
		country: 'in',
		pageSize: 12,
		category: 'general'
	}

	News.propTypes = {
		country: PropTypes.string,
		pageSize: PropTypes.number,
		category: PropTypes.string
	}


export default News