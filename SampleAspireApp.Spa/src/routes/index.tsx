import { Resource, component$, useResource$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  const forecast = useResource$<Forecast[]>(async () => {
    const response = await fetch(
      `${import.meta.env.PUBLIC_QWIK_APP_WEATHER_API}/weatherforecast`
    );
    const data = await response.json();
    return data as Forecast[];
  });

  return (
    <>
      <Resource
        value={forecast}
        onPending={() => <p>Loading...</p>}
        onResolved={(forecast: Forecast[]) => <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Temp. (C)</th>
              <th>Temp. (F)</th>
              <th>Summary</th>
            </tr>
          </thead>
          <tbody>
            {forecast.map((f: Forecast, i: number) => {
              return (
                <tr key={i}>
                  <td>{f.date}</td>
                  <td>{f.temperatureC}</td>
                  <td>{f.temperatureF}</td>
                  <td>{f.summary}</td>
                </tr>
              );
            })}
          </tbody>
        </table>}
      />
    </>
  );
});

type Forecast = {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
