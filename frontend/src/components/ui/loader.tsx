export const Loader = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="40" height="40">
        <g>
          <g transform="translate(80,50)">
            <g transform="rotate(0)">
              <circle fillOpacity="1" fill="#ffffff" r="6" cy="0" cx="0">
                <animateTransform attributeName="transform" type="scale" begin="-0.875s" values="1.5 1.5;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
                <animate attributeName="fillOpacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.875s"></animate>
              </circle>
            </g>
          </g>
          <g transform="translate(71.21320343559643,71.21320343559643)">
            <g transform="rotate(45)">
              <circle fillOpacity="0.875" fill="#ffffff" r="6" cy="0" cx="0">
                <animateTransform attributeName="transform" type="scale" begin="-0.75s" values="1.5 1.5;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
                <animate attributeName="fillOpacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.75s"></animate>
              </circle>
            </g>
          </g>
          <g transform="translate(50,80)">
            <g transform="rotate(90)">
              <circle fillOpacity="0.75" fill="#ffffff" r="6" cy="0" cx="0">
                <animateTransform attributeName="transform" type="scale" begin="-0.625s" values="1.5 1.5;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
                <animate attributeName="fillOpacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.625s"></animate>
              </circle>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}; 