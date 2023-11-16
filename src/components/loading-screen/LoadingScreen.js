import './LoadingScreen.scss';

export default function LoadingScreen() {

    return (
        <section id='loading-screen'>
            <div className='loading-animation-balls'>
                <div className='b'></div>
                <div className='b'></div>
                <div className='b'></div>
            </div>
        </section>
    )
}