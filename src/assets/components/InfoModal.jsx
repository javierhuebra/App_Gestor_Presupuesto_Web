import '../styles/InfoModal.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Spinner from 'react-bootstrap/Spinner';

import banner from '../images/funcionesplaner.png'

const InfoModal = (props) => {

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >


      <Modal.Header /* closeButton */ >


        <Modal.Title id="contained-modal-title-vcenter">

          <Button variant='warning' onClick={props.onHide}>Close</Button>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='cont-info'>


          <img className='img-banner' src={banner} alt="banner" />

          <div className='cont-text-info'>
            <p className='text-in'>
              Easy Planner es una aplicación multiplataforma,
              ya que se puede utilizar desde la web o descargarla en dispositivos android
              siguiendo el enlace a la playstore en la pantalla principal.
            </p>
            <table className='tab-info'>
              <tr>
                <td>Versión</td>
                <td>Plataformas</td>
                
                <td>Contacto</td>
              </tr>
              <tr>
                <td>1.0</td>
                <td>Web y Android</td>
                
                <td><a href="https://www.linkedin.com/in/javieremanuelhuebra/" className='link-edin' target='blank_'>Linkedin</a></td>
              </tr>
            </table>
          </div>

          <div className='cont-iframe'>

            <div className='ifram-e'>

              <iframe

                loading="true"
                width="300"
                height="255"
                src="https://www.youtube.com/embed/L44yyc8B0is"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen>

              </iframe>
            </div>

            <div className='spin-er'>
              <Spinner animation="border" variant="primary" />
            </div>
          </div>

        </div>
      </Modal.Body>
      <Modal.Footer>
        <p className='text-info-easy'>Easy Planner© 2023</p>
      </Modal.Footer>

    </Modal>
  )

}

export default InfoModal