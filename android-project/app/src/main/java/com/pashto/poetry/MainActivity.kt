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
    private lateinit var chipAdapter: PoetChipAdapter
    private lateinit var apiService: TelegramApiService

    private var allPosts = listOf<PoetryPost>()
    private var selectedPoetId = "all"

    // High-fidelity poets list matching the React app simulator
    private val poetsList = listOf(
        Poet("all", "ټول شاعران", "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=150&auto=format&fit=crop&q=80", "د ټولو شاعرانو کلامونه"),
        Poet("hamza", "حمزه بابا", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80", "امير الحمزه خان شينواری - د پښتو غزل بابا"),
        Poet("ghani", "غني خان", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80", "خان عبدالغني خان - فيلسوف او ليونی شاعر"),
        Poet("rahman", "رحمان بابا", "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80", "عبدالرحمان بابا - د پښتو د عرفان سرخېل"),
        Poet("khushal", "خوشحال خټک", "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80", "خوشحال خان خټک - ملي اتل او د توره خاوند"),
        Poet("matiullah", "مطیع الله تراب", "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80", "مطیع الله تراب - د حماسي او ولسي شعر زړه سواندی استازی"),
        Poet("karwan", "پیر محمد کاروان", "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80", "پیر محمد کاروان - د عاطفې نازک خيال شاعر")
    )

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Setup Toolbar
        setSupportActionBar(binding.toolbar)
        supportActionBar?.setDisplayShowTitleEnabled(false)

        // Setup horizontal Poet Chips List
        binding.rvPoets.layoutManager = LinearLayoutManager(this, LinearLayoutManager.HORIZONTAL, false)
        chipAdapter = PoetChipAdapter(this, poetsList) { selectedPoet ->
            selectedPoetId = selectedPoet.id
            applyFilter()
        }
        binding.rvPoets.adapter = chipAdapter

        // Setup main feed RecyclerView
        binding.recyclerView.layoutManager = LinearLayoutManager(this)
        adapter = PoetryAdapter(this, emptyList())
        binding.recyclerView.adapter = adapter

        // Setup OkHttpClient
        val logging = HttpLoggingInterceptor().apply {
            level = HttpLoggingInterceptor.Level.BODY
        }
        val okHttpClient = OkHttpClient.Builder()
            .addInterceptor(logging)
            .connectTimeout(30, TimeUnit.SECONDS)
            .readTimeout(30, TimeUnit.SECONDS)
            .build()

        // Point to the public pre-preview server URL so it successfully fetches data on live mobile builds
        val retrofit = Retrofit.Builder()
            .baseUrl("https://ais-pre-vobyra5qwdw2xoypqezono-694908262330.europe-west2.run.app/")
            .client(okHttpClient)
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        apiService = retrofit.create(TelegramApiService::class.java)

        // Refresh triggers
        binding.swipeRefresh.setOnRefreshListener {
            loadPoetry()
        }

        // Initial fetch
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
                        allPosts = poetryResponse.posts
                        applyFilter()
                    } else {
                        showError("تېروتنه رامنځته شوه")
                    }
                } else {
                    showError("د سرور ستونزه یا کنيکشن خراب دی")
                }
            }

            override fun onFailure(call: Call<PoetryResponse>, t: Throwable) {
                binding.progressBar.visibility = View.GONE
                binding.swipeRefresh.isRefreshing = false
                showError("انټرنیټ نشته یا سرور کار نه کوي")
            }
        })
    }

    private fun applyFilter() {
        val filtered = if (selectedPoetId == "all") {
            allPosts
        } else {
            val keyword = when (selectedPoetId) {
                "hamza" -> "حمزه"
                "ghani" -> "غني"
                "rahman" -> "رحمان"
                "khushal" -> "خوشحال"
                "matiullah" -> "تراب"
                "karwan" -> "کاروان"
                else -> ""
            }
            if (keyword.isEmpty()) {
                allPosts
            } else {
                allPosts.filter { post ->
                    post.authorName.contains(keyword) || post.text.contains(keyword)
                }
            }
        }
        
        adapter.updateData(filtered)
        
        if (filtered.isEmpty() && allPosts.isNotEmpty()) {
            Toast.makeText(this, "د دې شاعر شعرونه ونه موندل شول", Toast.LENGTH_SHORT).show()
        }
    }

    private fun showError(message: String) {
        Toast.makeText(this, message, Toast.LENGTH_LONG).show()
    }

    override fun onDestroy() {
        super.onDestroy()
        adapter.releaseAllPlayers()
    }
}
