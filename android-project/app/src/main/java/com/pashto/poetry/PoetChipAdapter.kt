package com.pashto.poetry

import android.content.Context
import android.graphics.Color
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.pashto.poetry.databinding.ItemPoetChipBinding

class PoetChipAdapter(
    private val context: Context,
    private val poets: List<Poet>,
    private val onPoetSelected: (Poet) -> Unit
) : RecyclerView.Adapter<PoetChipAdapter.PoetChipViewHolder>() {

    private var selectedPoetId: String = "all"

    fun setSelectedPoet(poetId: String) {
        selectedPoetId = poetId
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): PoetChipViewHolder {
        val binding = ItemPoetChipBinding.inflate(LayoutInflater.from(context), parent, false)
        return PoetChipViewHolder(binding)
    }

    override fun onBindViewHolder(holder: PoetChipViewHolder, position: Int) {
        val poet = poets[position]
        holder.bind(poet)
    }

    override fun getItemCount(): Int = poets.size

    inner class PoetChipViewHolder(private val binding: ItemPoetChipBinding) : RecyclerView.ViewHolder(binding.root) {

        fun bind(poet: Poet) {
            binding.tvPoetChipName.text = poet.name

            // Load Poet Avatar
            if (poet.avatar.isNotEmpty()) {
                Glide.with(context)
                    .load(poet.avatar)
                    .placeholder(R.drawable.ic_launcher)
                    .error(R.drawable.ic_launcher)
                    .into(binding.ivPoetChipAvatar)
            } else {
                binding.ivPoetChipAvatar.setImageResource(R.drawable.ic_launcher)
            }

            // High-Contrast Active/Inactive visual States
            val isSelected = poet.id == selectedPoetId
            if (isSelected) {
                // Active State: Emerald Green background, White text
                binding.cardChip.setCardBackgroundColor(ContextCompat.getColor(context, R.color.primary))
                binding.tvPoetChipName.setTextColor(Color.WHITE)
            } else {
                // Inactive State: Light slate/white background, Dark text
                binding.cardChip.setCardBackgroundColor(ContextCompat.getColor(context, R.color.card_bg))
                binding.tvPoetChipName.setTextColor(ContextCompat.getColor(context, R.color.text_light))
            }

            binding.root.setOnClickListener {
                if (selectedPoetId != poet.id) {
                    selectedPoetId = poet.id
                    notifyDataSetChanged()
                    onPoetSelected(poet)
                }
            }
        }
    }
}
