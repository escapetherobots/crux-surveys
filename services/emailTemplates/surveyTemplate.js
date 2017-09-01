const keys = require('./../../config/keys');

module.exports = (survey) => {
  // test body for email
  // return `<div>${survey.body}</div>`;

  return `
    <html>
      <body>
        <div style="text-align: center;">
          <table>
            <tr>
              <td>
                <h3>Please Fill Out Our Survey!</h3>
                <span>Please answer the following question:</span>
              </td>
            </tr>
            <tr>
              <td>
                <span>
                  ${survey.body}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <a href="${keys.redirectDomain}/api/surveys/thanks">Yes</a>
              </td>
              <td>
                <a href="${keys.redirectDomain}/api/surveys/thanks">No</a>
              </td>
            </tr>
          </table>
        </div>
      </body>
    </html>
  `;
};
