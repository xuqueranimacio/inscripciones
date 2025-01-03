import styles from "./terms.module.css";

export default function Page() {
  return (
    <main className={styles.main}>
      <h1>Política de Privacidad</h1>
      <h2>Identidad del Responsable</h2>
      <p>
        <strong>Xúquer Animació</strong>
        <br />
        CIF: [INSERTAR CIF]
        <br />
        Domicilio: [INSERTAR DIRECCIÓN]
        <br />
        Correo electrónico: [INSERTAR EMAIL]
        <br />
        Teléfono: [INSERTAR TELÉFONO]
      </p>

      <h2>Datos que Recopilamos</h2>
      <ul>
        <li>Nombre completo.</li>
        <li>Datos de contacto (teléfono, correo electrónico).</li>
        <li>Fecha de nacimiento de menores.</li>
        <li>
          Información de salud relevante para actividades (alergias,
          medicación).
        </li>
        <li>Datos bancarios (si se solicitan para ciertos pagos).</li>
      </ul>

      <h2>Finalidad del Tratamiento</h2>
      <ul>
        <li>
          Gestionar la inscripción y participación en nuestras actividades.
        </li>
        <li>Comunicaciones relacionadas con los servicios contratados.</li>
        <li>Cumplimiento de obligaciones legales.</li>
        <li>
          Enviar información comercial sobre nuestros servicios (solo con su
          consentimiento).
        </li>
      </ul>

      <h2>Base Legal para el Tratamiento</h2>
      <ul>
        <li>
          La ejecución de un contrato para la gestión de las inscripciones.
        </li>
        <li>El consentimiento otorgado para comunicaciones comerciales.</li>
        <li>El cumplimiento de nuestras obligaciones legales.</li>
      </ul>

      <h2>Destinatarios de los Datos</h2>
      <p>
        Xúquer Animació no comparte datos personales con terceros, salvo por
        obligaciones legales.
      </p>

      <h2>Derechos de los Usuarios</h2>
      <ul>
        <li>Acceder a sus datos personales.</li>
        <li>Rectificar datos incorrectos o incompletos.</li>
        <li>Solicitar la eliminación de sus datos.</li>
        <li>Limitar u oponerse al tratamiento.</li>
        <li>Retirar su consentimiento en cualquier momento.</li>
      </ul>
      <p>
        Para ejercer estos derechos, puede escribir a nuestro correo electrónico
        [INSERTAR EMAIL].
      </p>

      <h1>Términos y Condiciones</h1>
      <hr />
      <h2>Descripción de los Servicios</h2>
      <p>
        Xúquer Animació ofrece actividades extraescolares, campamentos y
        escuelas de vacaciones para niños, jóvenes y adultos. La inscripción se
        gestiona a través de nuestra plataforma o formularios físicos.
      </p>
      <h2>Proceso de Inscripción</h2>
      <ol>
        <li>
          El usuario deberá completar los formularios requeridos con información
          verídica.
        </li>
        <li>
          La plaza se confirmará tras recibir la documentación completa y, en su
          caso, el pago correspondiente.
        </li>
      </ol>
      <h2>Cancelaciones y Reembolsos</h2>
      <ul>
        <li>Cancelaciones antes de [PLAZO]: reembolso completo.</li>
        <li>
          Cancelaciones después de [PLAZO]: no se garantiza el reembolso, salvo
          casos excepcionales justificados.
        </li>
        <li>
          Si Xúquer Animació cancela un servicio, se devolverá el importe
          completo.
        </li>
      </ul>
      <h2>Normas de Participación</h2>
      <ul>
        <li>
          Los participantes deben seguir las indicaciones de los monitores.
        </li>
        <li>
          Xúquer Animació no se hace responsable de pérdidas o daños de objetos
          personales.
        </li>
        <li>
          El incumplimiento de las normas puede resultar en la expulsión de la
          actividad sin derecho a reembolso.
        </li>
      </ul>
      <h2>Exoneración de Responsabilidad</h2>
      <p>Xúquer Animació no se responsabiliza por:</p>
      <ul>
        <li>
          Accidentes o lesiones que no sean atribuibles a negligencia por
          nuestra parte.
        </li>
        <li>
          Problemas derivados de información incompleta o incorrecta
          proporcionada por el usuario.
        </li>
      </ul>
      <h2>Modificaciones</h2>
      <p>
        Nos reservamos el derecho de modificar estos términos y condiciones.
        Cualquier cambio será notificado a través de nuestra página web o por
        correo electrónico.
      </p>
      <h2>Legislación Aplicable</h2>
      <p>
        Este contrato se regirá por la legislación española. Cualquier
        controversia será sometida a los tribunales de Valencia, salvo que la
        ley disponga otra cosa.
      </p>
    </main>
  );
}
