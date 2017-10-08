package com.faustool.backendproxy;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.*;
import java.net.URISyntaxException;
import java.net.URLEncoder;

@RestController
public class BackendProxyController {

    private static final String PEXELS_KEY = "563492ad6f9170000100000172db58b84338421e61e1b42fbfa8d7f1";

    @GetMapping(value = "/api/weather", produces = MediaType.APPLICATION_JSON_VALUE)
    public String getWeather(@RequestParam String search) throws URISyntaxException, IOException {
        try (CloseableHttpClient httpClient = HttpClientBuilder.create().build()) {
            String url = "https://api.pexels.com/v1/search?query=" + encode(search) + "&per_page=5&page=1";
            HttpGet httpGet = new HttpGet(url);
            httpGet.addHeader(HttpHeaders.AUTHORIZATION, PEXELS_KEY);
            return getResult(httpClient, httpGet);
        }
    }

    @GetMapping(value = "/api/wiki", produces = MediaType.APPLICATION_JSON_VALUE)
    public String getWiki(@RequestParam String search) throws IOException {
        String url = "http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + encode(search);
        try (CloseableHttpClient httpClient = HttpClientBuilder.create().build()) {
            HttpGet httpGet = new HttpGet(url);
            return getResult(httpClient, httpGet);
        }
    }

    private String getResult(CloseableHttpClient httpClient, HttpGet httpGet) throws IOException {
        CloseableHttpResponse response = httpClient.execute(httpGet);
        char[] data = new char[1000];
        int read;
        try (BufferedReader br = new BufferedReader(new InputStreamReader(response.getEntity().getContent()))) {
            try (StringWriter sw = new StringWriter()) {
                while ((read = br.read(data, 0, data.length)) != -1) {
                    sw.write(data, 0, read);
                }
                return sw.toString();
            }
        }
    }

    private String encode(String search) throws UnsupportedEncodingException {
        return URLEncoder.encode(search, "utf-8");
    }

}
