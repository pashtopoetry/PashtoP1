package com.pashto.poetry

import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.pashto.poetry.databinding.ActivityMainBinding
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.util.concurrent.TimeUnit

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private lateinit var adapter: PoetryAdapter
    private lateinit var apiService: TelegramApiService

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Setup Toolbar
        setSupportActionBar(binding.toolbar)
        supportActionBar?.setDisplayShowTitleEnabled(false)

        // Setup RecyclerView
        binding.recyclerView.layoutManager = LinearLayoutManager(this)
        adapter = PoetryAdapter(this, emptyList())
        binding.recyclerView.adapter = adapter

        // Setup Retrofit
        val logging = HttpLoggingInterceptor().apply {
            level = HttpLoggingInterceptor.Level.BODY
        }
        val okHttpClient = OkHttpClient.Builder()
            .addInterceptor(logging)
            .connectTimeout(30, TimeUnit.SECONDS)
            .readTimeout(30, TimeUnit.SECONDS)
            .build()

        // Replace with actual server domain
        val retrofit = Retrofit.Builder()
            .baseUrl("https://ais-dev-vobyra5qwdw2xoypqezono-694908262330.europe-west2.run.app/")
            .client(okHttpClient)
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        apiService = retrofit.create(TelegramApiService::class.java)

        // Refresh actions
        binding.swipeRefresh.setOnRefreshListener {
            loadPoetry()
        }

        // Initial Load
        loadPoetry()
    }

    private fun loadPoetry() {
        binding.progressBar.visibility = if (binding.swipeRefresh.isRefreshing) View.GONE else View.VISIBLE

        val channel = getString(R.string.telegram_channel)
        apiService.getPoetryFeed(channel).enqueue(object : Callback<PoetryResponse> {
            override fun onResponse(call: Call<PoetryResponse>, response: Response<PoetryResponse>) {
                binding.progressBar.visibility = View.GONE
                binding.swipeRefresh.isRefreshing = false

                if (response.isSuccessful && response.body() != null) {
                    val poetryResponse = response.body()!!
                    if (poetryResponse.ok) {
                        adapter.updateData(poetryResponse.posts)
                    } else {
                        showError("تېروتنه رامنځته شوه")
                    }
                } else {
                    showError("د سرور ستونزه")
                }
            }

            override fun onFailure(call: Call<PoetryResponse>, t: Throwable) {
                binding.progressBar.visibility = View.GONE
                binding.swipeRefresh.isRefreshing = false
                showError("انټرنیټ نشته یا سرور غیر فعاله دی")
            }
        })
    }

    private fun showError(message: String) {
        Toast.makeText(this, message, Toast.LENGTH_LONG).show()
    }

    override fun onDestroy() {
        super.onDestroy()
        adapter.releaseAllPlayers()
    }
}
