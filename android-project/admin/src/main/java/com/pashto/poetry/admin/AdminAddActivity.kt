package com.pashto.poetry.admin

import android.os.Bundle
import android.view.View
import android.widget.ArrayAdapter
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.pashto.poetry.admin.databinding.ActivityAdminAddBinding
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.util.concurrent.TimeUnit

class AdminAddActivity : AppCompatActivity() {

    private lateinit var binding: ActivityAdminAddBinding
    private lateinit var apiService: AdminApiService

    // High-fidelity list of poets
    private val poets = listOf(
        "حمزه بابا",
        "غني خان",
        "رحمان بابا",
        "خوشحال خټک",
        "مطیع الله تراب",
        "پیر محمد کاروان",
        "پښتو ولسي کلام"
    )

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityAdminAddBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Setup Toolbar & back button navigation
        setSupportActionBar(binding.toolbarAdd)
        supportActionBar?.setDisplayShowTitleEnabled(false)
        supportActionBar?.setDisplayHomeAsUpEnabled(true)
        binding.toolbarAdd.setNavigationOnClickListener {
            onBackPressedDispatcher.onBackPressed()
        }

        // Populate Spinner with beautiful Pashto poet names
        val spinnerAdapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, poets).apply {
            setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        }
        binding.spinnerPoet.adapter = spinnerAdapter

        // Media Type selection listeners to toggle corresponding attachment inputs
        binding.rgMediaType.setOnCheckedChangeListener { _, checkedId ->
            when (checkedId) {
                R.id.rbText -> {
                    binding.tvPhotoUrlLabel.visibility = View.GONE
                    binding.tilPhotoUrl.visibility = View.GONE
                    binding.tvVideoUrlLabel.visibility = View.GONE
                    binding.tilVideoUrl.visibility = View.GONE
                }
                R.id.rbImage -> {
                    binding.tvPhotoUrlLabel.visibility = View.VISIBLE
                    binding.tilPhotoUrl.visibility = View.VISIBLE
                    binding.tvVideoUrlLabel.visibility = View.GONE
                    binding.tilVideoUrl.visibility = View.GONE
                }
                R.id.rbVideo -> {
                    binding.tvPhotoUrlLabel.visibility = View.GONE
                    binding.tilPhotoUrl.visibility = View.GONE
                    binding.tvVideoUrlLabel.visibility = View.VISIBLE
                    binding.tilVideoUrl.visibility = View.VISIBLE
                }
            }
        }

        // Setup OkHttpClient
        val logging = HttpLoggingInterceptor().apply {
            level = HttpLoggingInterceptor.Level.BODY
        }
        val okHttpClient = OkHttpClient.Builder()
            .addInterceptor(logging)
            .connectTimeout(30, TimeUnit.SECONDS)
            .readTimeout(30, TimeUnit.SECONDS)
            .build()

        // Setup Retrofit
        val retrofit = Retrofit.Builder()
            .baseUrl("https://ais-pre-vobyra5qwdw2xoypqezono-694908262330.europe-west2.run.app/")
            .client(okHttpClient)
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        apiService = retrofit.create(AdminApiService::class.java)

        // Publish Action
        binding.btnPublish.setOnClickListener {
            publishPoetry()
        }
    }

    private fun publishPoetry() {
        val selectedPoet = binding.spinnerPoet.selectedItem.toString()
        val text = binding.etPoetryText.text?.toString()?.trim() ?: ""

        if (text.isEmpty()) {
            Toast.makeText(this, getString(R.string.text_required), Toast.LENGTH_LONG).show()
            return
        }

        val mediaType = when (binding.rgMediaType.checkedRadioButtonId) {
            R.id.rbImage -> "PHOTO"
            R.id.rbVideo -> "VIDEO"
            else -> "NONE"
        }

        val photoUrl = if (mediaType == "PHOTO") {
            binding.etPhotoUrl.text?.toString()?.trim()?.takeIf { it.isNotEmpty() }
        } else null

        val videoUrl = if (mediaType == "VIDEO") {
            binding.etVideoUrl.text?.toString()?.trim()?.takeIf { it.isNotEmpty() }
        } else null

        binding.btnPublish.isEnabled = false
        binding.btnPublish.text = "د خپرېدو په حال کې..."

        val request = PublishPostRequest(
            authorName = selectedPoet,
            text = text,
            mediaType = mediaType,
            photoUrl = photoUrl,
            videoUrl = videoUrl
        )

        apiService.publishPost(request).enqueue(object : Callback<AdminPublishResponse> {
            override fun onResponse(call: Call<AdminPublishResponse>, response: Response<AdminPublishResponse>) {
                binding.btnPublish.isEnabled = true
                binding.btnPublish.text = getString(R.string.publish)

                if (response.isSuccessful && response.body()?.ok == true) {
                    Toast.makeText(this@AdminAddActivity, getString(R.string.published_toast), Toast.LENGTH_SHORT).show()
                    finish()
                } else {
                    Toast.makeText(this@AdminAddActivity, "د خپرولو تېروتنه رامنځته شوه", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<AdminPublishResponse>, t: Throwable) {
                binding.btnPublish.isEnabled = true
                binding.btnPublish.text = getString(R.string.publish)
                Toast.makeText(this@AdminAddActivity, "د انټرنیټ اړیکه نشته", Toast.LENGTH_SHORT).show()
            }
        })
    }
}
