import React from 'react'
import { Link, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Avatar from '../../components/Avatar/Avatar'
import moment from 'moment'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { deleteAnswer } from "../../actions/question"

const DisplayAnswer = ({ question }) => {

    const User = useSelector((state) => (state.currentUserReducer));
    const dispatch = useDispatch();
    const { id } = useParams();

    const handleDelete = (answerId, noOfAnswers) => {
        dispatch(deleteAnswer(id, answerId, noOfAnswers - 1));
    }


    return (
        <div>
            {
                question.answer.map((ans) => (
                    <div className='display-ans' key={ans._id}>
                        <p>{ans.answerBody}</p>
                        <div className='question-actions-user'>
                            <div>

                                <button type='button'>Share</button>

                                {User?.result?._id === ans?.userId && (
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(ans._id, question.noOfAnswers)}
                                    >
                                        Delete
                                    </button>
                                )}

                            </div>
                            <div>
                                <p>answer {moment(ans.answeredOn).fromNow()}</p>
                                <Link to={`/User/${question.userId}`} className='user-link' style={{ color: "#0086d8" }}>
                                    <Avatar backgroundColor="green" px="8px" py="5px">{ans.userAnswered.charAt(0).toUpperCase()}</Avatar>
                                    <div>
                                        {ans.userAnswered}
                                    </div>
                                </Link>
                            </div>
                        </div>

                    </div>
                ))
            }
        </div>
    )
}

export default DisplayAnswer
